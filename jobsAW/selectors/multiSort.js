import R from 'ramda';
import bug from '../../_libs/bug';

import { Iterable } from 'immutable';

// import { testData } from './_testData';

// https://github.com/ramda/ramda/wiki/Cookbook#sort-a-list-by-array-of-props-if-first-prop-equivalent-sort-by-second-etc
const variadicEither = (head, ...tail) => 
    R.reduce (R.either, head, tail);

// const getComparatorFor = (prop) => 
//     R.comparator ((a,b) => R.gt (R.prop (prop, a), R.prop (prop, b)));


// use a provided property map [1], look-up for values on a prop or following a path array
// undefined value will be set to Infinity for sorting at the end
// const byPropMap = (props, obj) => {
//     const newProp = props[1][ R.pathOr (obj[props[0]], props[0], obj) ];  // here a path
// bug('+++ multiSort::byPropMap props, obj', props, obj, newProp !== undefined ? newProp : Infinity)
//     return newProp !== undefined ? newProp : Infinity;
// }
const byPropMap = (props, obj) => {
    const newProp = props[1][ R.pathOr (obj[props[0]], props[0], obj) ];  // here a path

    // bug('+++ multiSort::byPropMap', 
    //     obj[props[0]], props[0], obj,
    //     R.pathOr (obj[props[0]], props[0], obj),
    //     props[1]
    // )
    // +++ multiSort::byPropMap M city Record{_map: Map, text: {…}, param: {…}} M {S: 0, M: 1, K: 2, F: 3}

// bug('+++ multiSort::byPropMap props, obj', props, obj, newProp !== undefined ? newProp : Infinity)
    return newProp !== undefined ? newProp : Infinity;
}


// export const makeComparator = (prop) => {
//                                                                 bug('~~~~~~  makeComparator prop', prop)
//     const comparatorLt = (a,b) => R.lt (getProp (prop, a), getProp (prop, b));
//     const comparatorGt = (a,b) => R.gt (getProp (prop, a), getProp (prop, b));


//     let getProp;
//     let comparator = comparatorLt;

//                                                                                 // bug('prop', prop)
//     if (R.isEmpty(prop)) {
//         return R.comparator (R.T);
//     }


//     if (typeof prop === 'string') {
//         getProp = R.prop;

//     } else if (Array.isArray (prop)) {

//         // a path instead of a prop, but no map
//         if (typeof prop[1] === 'string') {
//             if (R.last(prop) === 'DSC') {
//                 prop = prop.slice(0,-1);
//                 comparator = comparatorGt;
//             }
    
//             getProp = R.path;

//         } else {
//             getProp = byPropMap;
//         }

//     }

    
//     return R.comparator (comparator);

// };


// add const compare = (a, b) => a.localeCompare (b) for lexical sort
//      see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
//      see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
//      also: https://stackoverflow.com/a/47640811/9083816
const getComparatorFor = (comparatorFn, getProp, prop) => 
    (a,b) => comparatorFn (getProp (prop, a), getProp (prop, b));

    
const makeComparator = (props) => {
                                                                // bug('~~~~~~  makeComparator props', props)
    // defaults
    let comparator = R.T;  // props are empty
    let getProp = R.prop;  // props are a single string
    let comparatorFn = R.lt;  // props do not include DSC (standard case: ASC)

    if (!R.isEmpty (props)) {
                                                                            // bug('multiSort::props', props)   
                                                    // bug('multiSort::props isImmutable', Iterable.isIterable(props))
        if (Array.isArray (props)) {
            const propsIncludeMap = typeof props[1] !== 'string';
                                                // bug('multiSort::props isImmutable', Iterable.isIterable(props[1]))
            getProp = propsIncludeMap ? byPropMap : R.path;
// bug('+++ getProp', getProp)
            if (!propsIncludeMap && R.last(props) === 'DSC') {
                props = props.slice(0,-1);
                comparatorFn = R.gt;
            }
        }

        comparator = getComparatorFor(comparatorFn, getProp, props);
    }
    
    return R.comparator (comparator);

};


const multiSort = R.curry ((props, list) => 
    R.sort (variadicEither (...R.map (makeComparator, props)), list));



// const sortResult = multiSort(['a','b','c'], [{a:1,b:2,c:3}, {a:10,b:10,c:10}, 
//     {a:10,b:6,c:0}, {a:1, b:2, c:1}, {a:100}])

// const citySel = ['city', {
//     S: 0,
//     M: 1,
//     // F: 2
// }];

// const indySel = ['indy', {
//     1: 0,
// }];

// const sortProps = [citySel, indySel, 'id'];
// // const sortProps = [citySel, 'type', 'indy'];
// // const sortProps = ['city', 'type', 'indy'];
// // const sortProps = ['type', 'indy'];

// const sortResult = multiSort(sortProps, testData);

    
// bug('--->> sortResult', sortResult)

export default multiSort;
