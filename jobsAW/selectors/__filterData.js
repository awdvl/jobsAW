import R from 'ramda';

export default (predicates, data) => 
    R.filter (R.allPass (predicates), data);
