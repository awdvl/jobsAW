import bug from '../../_libs/bug';
import R from 'ramda';


export const getProp = (prop) => R.prop(prop);

// use: groupByProp = groupBy(prop);  grouped = groupByProp(data);
export const groupBy = R.pipe(getProp, R.groupBy);

export const comparatorSelection = R.curry((selectedItems, x) => selectedItems.includes(x));
export const comparatorSelection2 = R.curry((selectedItems, key, x) => selectedItems.includes(x));

// R.contains
// R.filter(R.where({tags: R.contains('fun')}))

// export const comparatorSelection3 = R.curry((selectedItems, key, x) => selectedItems.includes(x));


// const filledCompareSelected = compareSelection(['M', 'S'])
// const predicateA = R.propSatisfies(filledCompareSelected, 'city');
// // const predicateA = R.propEq('city', 'M');
// const predicateB = R.propEq('type', 3);
// const selectedPredicates = [predicateA, predicateB];

// const multiFilter = R.filter(R.allPass(selectedPredicates))


export const getPredicate = R.curry((key, comparator) => (
    R.propSatisfies(comparator, key)
));

// export const getPredicateAlt = R.curry((comparator, key) => (
export const getPredicate2 = R.curry((comparator, key) => (
    R.propSatisfies(comparator, key)
));

// export const getPredicate2 = R.curry(R.pipe(comparatorSelection3, getPredicateAlt));

// export const getPredicate3 = R.pipe(comparatorSelection2, getPredicate2);
export const getPredicate3 = R.curry((comparison, key, data) => (
    R.propSatisfies(comparatorSelection2(comparison, key, data))
));


export const multiFilter = R.curry((predicates, data) => R.filter(R.allPass(predicates), data));