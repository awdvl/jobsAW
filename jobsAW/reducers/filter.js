import { combineReducers } from 'redux';
import { List, Map, fromJS } from 'immutable';
import FilterCity from '../records/FilterCity';
import FilterJobType from '../records/FilterJobType';
import FilterCompIndustry from '../records/FilterCompIndustry';
import FilterCompEmpl from '../records/FilterCompEmpl';


const initStateOrder = List(['city', 'compIndy']);

const order = (state=initStateOrder, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


/** 
 *  sel: []  selected items
 *  sortOrder: []  sort by a predefined order concept, e.g. by name, population, ...
 *  sortByOrder: boolean  true: use the sortOrder,  false: use the order of the sel array
 *  inclRest: boolean  include other items (except excluded values)
 *  sortRest: true/[]  true: same sort order as in sortOrder,  []: define a different sort order
 *  excl: []  excluded items
*/
const initStateCity = new FilterCity({
    // sel: ['S', 'M'],
    sel: [],
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


const initStateCompIndy = new FilterCompIndustry({
    sel: [],
    sortOrder: [1,2],
    sortByOrder: true,
    inclRest: false,
    sortRest: true,
    excl: [3]
});

const compIndy = (state=initStateCompIndy, action) => {
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
    order,
    city,
    compIndy,
    compEmpl,
    jobType,
});