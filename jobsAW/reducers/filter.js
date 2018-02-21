import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';
import FilterCity from '../records/FilterCity';
import FilterJobType from '../records/FilterJobType';
import FilterCompIndustry from '../records/FilterCompIndustry';
import FilterCompEmpl from '../records/FilterCompEmpl';


const initStateCity = new FilterCity({
    sel: ['S', 'M'],
    sortOrder: ['pop', 'name'],
    sortByOrder: false,
    // inclRest: false,
    inclRest: true,
    sortRest: true,
    // excl: []
    excl: ['K']
});

const city = (state=initStateCity, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateCompIndustry = new FilterCompIndustry({
    sel: [1],
    sortOrder: [],
    sortByOrder: false,
    inclRest: true,
    sortRest: true,
    excl: [3]
});

const compIndustry = (state=initStateCompIndustry, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateCompEmpl = new FilterCompEmpl({
    sel: [],
    sortOrder: [],
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: []
});

const compEmpl = (state=initStateCompEmpl, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateJobType = new FilterJobType({
    sel: [3]
});

const jobType = (state=initStateJobType, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export const filter = combineReducers({
    city,
    compIndustry,
    compEmpl,
    jobType,
});