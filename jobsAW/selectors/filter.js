import { createSelector } from 'reselect';


// this to reducer (see abramov!!)
const getFilterOrder = (state) => state.ui.filter.__order;

export const selectFilterOrder = createSelector(
    getFilterOrder,

    (filterOrder) => {
        return filterOrder;
    }
);