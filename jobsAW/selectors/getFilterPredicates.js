import { createSelector } from 'reselect';
import makePredicate from './makePredicate';

const makePredicateSelector = (filterProp, prop=filterProp) => (
    createSelector(
        state => state.ui.filter[filterProp].sel,
        state => state.ui.filter[filterProp].inclRest,
        state => state.ui.filter[filterProp].excl,
    
        (sel, inclRest, excl) => {
            return makePredicate(sel, inclRest, excl, prop);
        }
    )
);

// const predicateCity = createSelector(
//     state => state.ui.filter.city.sel,
//     state => state.ui.filter.city.inclRest,
//     state => state.ui.filter.city.excl,

//     (sel, inclRest, excl) => {
//         return makePredicate(sel, inclRest, excl, 'city');
//     }
// );

export const getPredicateCity = makePredicateSelector('city');
export const getPredicateJobType = makePredicateSelector('jobType', 'type');
export const getPredicateCompIndy = makePredicateSelector('compIndy', 'indy');

export default makePredicateSelector;