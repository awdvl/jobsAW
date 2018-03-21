import R from 'ramda';

export const filterByPredicates = R.curry ((predicates, data) => 
    R.filter (R.allPass (predicates), data));