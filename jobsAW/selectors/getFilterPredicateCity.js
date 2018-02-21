import { createSelector } from 'reselect';
import makePredicate from './makePredicate';

const makePredicateSelector = prop => (
    createSelector(
        state => state.ui.filter[prop].sel,
        state => state.ui.filter[prop].inclRest,
        state => state.ui.filter[prop].excl,
    
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

const predicateCity = makePredicateSelector('city');

export default predicateCity;