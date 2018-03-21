import R from 'ramda';

import bug from '../../_libs/bug';

// const log = R.bind (console.log, console);
// const sayX = x => console.log ('x is ' + x);

const comparator = R.curry ((sel, inclRest, excl, x) => {

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


const makePredicate = (sel, inclRest, excl, key) => R.propSatisfies (comparator (sel, inclRest, excl), key);

export default makePredicate;