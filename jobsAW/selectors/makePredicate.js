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


// const makePredicate = (sel, inclRest, excl, key) => R.propSatisfies (comparator (sel, inclRest, excl), key);

const makePredicate = (sel, inclRest, excl, key) => {
    let predicateComparator;

    bug('°° keyA', key)

    if (Array.isArray (key)) {
        predicateComparator = comparator2 (key[1]);
        key = key[0];

    } else {
        predicateComparator = comparator;
    }

    bug('°° keyB', key)

    return R.propSatisfies (predicateComparator (sel, inclRest, excl), key);
}

export default makePredicate;