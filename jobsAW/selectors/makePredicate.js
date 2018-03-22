import R from 'ramda';

import bug from '../../_libs/bug';

// const log = R.bind (console.log, console);
// const sayX = x => console.log ('x is ' + x);


// if key is string -> return string (identity)
// if key is array -> enter in path (first element) and second element as key 

const comparator = R.curry ((sel, inclRest, excl, x) => {

        // if (x is object)
        // bug('°° comparator  x', x)

    // only sel
    if (!inclRest && !R.isEmpty (sel)) {
        return R.contains (x, sel);

    // all without excl
    // } else if (excl && !R.isEmpty (excl)) {
    } else if (!R.isEmpty (excl)) {
        return !R.contains (x, excl);

    // all
    } else {
        return true;
    }

});

// ---> instead of key pass an access function identity or key!!!
const comparator2 = (key) => {
                                                                // bug('°° comparator2 invoke key', key)

    return (R.curry ((sel, inclRest, excl, xObj) => {

            // if (x is object)
        const x = xObj[key];
                                                                        // bug('°° comparator2 xObj, x', xObj, x)
        // only sel
        if (!inclRest && !R.isEmpty (sel)) {
            return R.contains (x, sel);

        // all without excl
        // } else if (excl && !R.isEmpty (excl)) {
        } else if (!R.isEmpty (excl)) {
            return !R.contains (x, excl);

        // all
        } else {
            return true;
        }
    }));
};

const comparator3 = (getProp) => {
    return (R.curry ((sel, inclRest, excl, xObj) => {

        const x = getProp (xObj);
                                                                        // bug('°° comparator2 xObj, x', xObj, x)
        // only sel
        if (!inclRest && !R.isEmpty (sel)) {
            return R.contains (x, sel);

        // all without excl
        // } else if (excl && !R.isEmpty (excl)) {
        } else if (!R.isEmpty (excl)) {
            return !R.contains (x, excl);

        // all
        } else {
            return true;
        }
    }));
};
const comparator4 = (R.curry ((getProp, sel, inclRest, excl, xObj) => {

        const x = getProp (xObj);
                                                                        // bug('°° comparator2 xObj, x', xObj, x)
        // only sel
        if (!inclRest && !R.isEmpty (sel)) {
            return R.contains (x, sel);

        // all without excl
        // } else if (excl && !R.isEmpty (excl)) {
        } else if (!R.isEmpty (excl)) {
            return !R.contains (x, excl);

        // all
        } else {
            return true;
        }
    }));



// const makePredicate = (sel, inclRest, excl, key) => R.propSatisfies (comparator (sel, inclRest, excl), key);

const makePredicate = (sel, inclRest, excl, key) => {
    // let predicateComparator;

    bug('°° keyA', key)

    // if (Array.isArray (key)) {
    //     predicateComparator = comparator2 (key[1]);
    //     key = key[0];

    // } else {
    //     predicateComparator = comparator;
    // }
    let getProp = R.identity;

    if (Array.isArray (key)) {
        getProp = R.prop (key[1]);
        key = key[0];
    }

    const predicateComparator = comparator3 (getProp);

    bug('°° keyB', key)

    // return R.propSatisfies (predicateComparator (sel, inclRest, excl), key);
    return R.propSatisfies (comparator4 (getProp, sel, inclRest, excl), key);
}

export default makePredicate;