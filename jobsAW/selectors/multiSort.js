import R from 'ramda';
import bug from '../../_libs/bug';

import { testData } from './_testData';

// https://github.com/ramda/ramda/wiki/Cookbook#sort-a-list-by-array-of-props-if-first-prop-equivalent-sort-by-second-etc
const variadicEither = (head, ...tail) => 
    R.reduce (R.either, head, tail);

// const makeComparator = (prop) => 
//     R.comparator ((a,b) => R.gt (R.prop (prop, a), R.prop (prop, b)));


// use a provided property map [1], look-up for values on a prop or following a path array
// compare prop value to index map
const byPropMap = (propSelection, obj) => {
    const newProp = propSelection[1][ R.pathOr (obj[propSelection[0]], propSelection[0], obj) ];  // here a path

    return newProp !== undefined ? newProp : Infinity;
}

// -->> here maybe as last prop a possible DSC -> if DSC, change R.lt to R.gt
export const makeComparatorIx = (prop) => {

    const comparatorLt = (a,b) => {
        // bug('prop', prop, getProp (prop, a), ' - ', getProp (prop, b))
        return R.lt (getProp (prop, a), getProp (prop, b));
    }
    const comparatorGt = (a,b) => {
        // bug('prop', prop, getProp (prop, a), ' - ', getProp (prop, b))
        // return R.gt (getProp (prop, a), getProp (prop, b));
        return R.gt (getProp (prop, a), getProp (prop, b));
    }

    let getProp;
    let comparator = comparatorLt;

                                                                                // bug('prop', prop)
    if (R.isEmpty(prop)) {
        return R.comparator (R.T);
    }


    if (typeof prop === 'string') {
        getProp = R.prop;

    } else if (Array.isArray (prop)) {

        // a path instead of a prop, but no map
        if (typeof prop[1] === 'string') {
            if (R.last(prop) === 'DSC') {
                prop = prop.slice(0,-1);
                comparator = comparatorGt;
            }
    
            getProp = R.path;

        } else {
            getProp = byPropMap;
        }

    }

    
    return R.comparator (comparator);

};


const sortByProps = (props, list) => 
    // R.sort (variadicEither (...R.map (makeComparator, props)), list)
    R.sort (variadicEither (...R.map (makeComparatorIx, props)), list)

// const sortResult = sortByProps(['a','b','c'], [{a:1,b:2,c:3}, {a:10,b:10,c:10}, 
//     {a:10,b:6,c:0}, {a:1, b:2, c:1}, {a:100}])

const citySel = ['city', {
    S: 0,
    M: 1,
    // F: 2
}];

const indySel = ['indy', {
    1: 0,
}];

const sortProps = [citySel, indySel, 'id'];
// const sortProps = [citySel, 'type', 'indy'];
// const sortProps = ['city', 'type', 'indy'];
// const sortProps = ['type', 'indy'];

const sortResult = sortByProps(sortProps, testData);

    
bug('--->> sortResult', sortResult)

export default sortByProps;
