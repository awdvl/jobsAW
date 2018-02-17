import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';
import FilterCity from '../records/FilterCity';
// import reviverFor from '../utils/reviverFor';

// const initState = Map({});
// const initState = Map({
//     sel: ['S', 'M'],
//     sortOrder: ['pop', 'name'],
//     sortByOrder: false,
//     inclRest: false,
//     sortRest: true,
//     excl: []
// });

const initState = new FilterCity({
    sel: ['S', 'M'],
    sortOrder: ['pop', 'name'],
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: []
});

// const initState = fromJS({
//     sel: ['S', 'M'],
//     sortOrder: ['pop', 'name'],
//     sortByOrder: false,
//     inclRest: false,
//     sortRest: true,
//     excl: []
// }, reviverFor(FilterCity));


const city = (state=initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const filter = combineReducers({
    city
});