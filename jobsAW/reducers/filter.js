import { combineReducers } from 'redux';
import { List, Map, fromJS } from 'immutable';
import FilterCity from '../records/FilterCity';
import FilterJobType from '../records/FilterJobType';
import FilterCompIndustry from '../records/FilterCompIndustry';
import FilterCompEmpl from '../records/FilterCompEmpl';


// const initStateOrder = List(['city', 'compIndy']);
const initStateOrder = List(['city', 'compIndy', 'jobType']);

const __order = (state=initStateOrder, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateConvNames = Map({
    jobType: 'type',
    compIndy: ['param', 'indy']
});

//  necessary for the different object keys in state.ui.filter and the jobs.json  ->  used in prepareFilterState
const __mapToPath = (state=initStateConvNames, action) => {
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
    sel: ['S', 'M'],
    // sel: [],
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
    sel: [1],
    // sel: [],
    sortOrder: [1,2],
    sortByOrder: false,
    inclRest: true,
    sortRest: true,
    // excl: [3]
    excl: []
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
    // sel: [3]
    // sel: []
    sel: [1,2,3],
    // sortOrder: ['name'],
    // sortByOrder: true
});

const jobType = (state=initStateJobType, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export const filter = combineReducers({
    __order,
    __mapToPath,
    city,
    compIndy,
    compEmpl,
    jobType,
});