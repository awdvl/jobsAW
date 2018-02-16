import { combineReducers } from 'redux';
import { Map } from 'immutable';

// const initState = Map({});
const initState = Map({
    sel: ['S', 'M'],
    sortOrder: ['pop', 'name'],
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: []
});

const city = (state=initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const filter = combineReducers({
    city
});