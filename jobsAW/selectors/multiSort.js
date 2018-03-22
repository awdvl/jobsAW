import R from 'ramda';
import bug from '../../_libs/bug';

// https://github.com/ramda/ramda/wiki/Cookbook#sort-a-list-by-array-of-props-if-first-prop-equivalent-sort-by-second-etc
const variadicEither = (head, ...tail) => 
    R.reduce (R.either, head, tail);


// use a provided property map [1], look-up for values on a prop or following a path array
//      undefined values will be set to Infinity for sorting at the end
const byPropMap = (props, obj) => {
    const newProp = props[1][ R.pathOr (obj[props[0]], props[0], obj) ];

// bug('+++ multiSort::byPropMap props, obj', props, obj, newProp !== undefined ? newProp : Infinity)
    return newProp !== undefined ? newProp : Infinity;
}


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
        if (Array.isArray (props)) {
            const propsIncludeMap = typeof props[1] !== 'string';

            getProp = propsIncludeMap ? byPropMap : R.path;
                                                                            // bug('+++ getProp', getProp)
            if (!propsIncludeMap && R.last (props) === 'DSC') {
                props = props.slice (0,-1);
                comparatorFn = R.gt;
            }
        }

        comparator = getComparatorFor(comparatorFn, getProp, props);
    }
    
    return R.comparator (comparator);

};


export default R.curry ((props, list) => 
    R.sort (variadicEither (...R.map (makeComparator, props)), list));
