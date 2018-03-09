import { combineReducers } from 'redux';
import { List, Map, fromJS } from 'immutable';
import FilterCity from '../records/FilterCity';
import FilterJobType from '../records/FilterJobType';
import FilterCompIndustry from '../records/FilterCompIndustry';
import FilterCompEmply from '../records/FilterCompEmply';

import { UPDATE_FILTER_ORDER, UPDATE_FILTER_ISMOVING } from '../constants/filter';


// const initStateOrder = List(['city', 'compIndy']);
// const initStateOrder = List(['city', 'compIndy', 'jobType']);

const initStateOrder = List(['city', 'compIndy', 'jobType', 'compEmply']);
// const initStateOrder = List(['compIndy', 'city', 'jobType', 'compEmply']);

export const __order = (state=initStateOrder, action) => {
    switch (action.type) {
        case UPDATE_FILTER_ORDER:
            // console.log('## action.payload', action.payload)
            // console.log('## reducer',
            //     state.splice(action.payload.index, 1).splice(action.payload.atIndex, 0, action.payload.filter))
            return state.splice(action.payload.index, 1).splice(action.payload.atIndex, 0, action.payload.filter);

        default:
            return state;
    }
};

export const __isMoving = (state=false, action) => {
    switch (action.type) {
        case UPDATE_FILTER_ISMOVING:
            return action.payload;

        default:
            return state;
    }
};

const initPointToPath = Map({
    jobType: 'type',
    compIndy: 'indy',
    compEmply: 'emply',
});

//  necessary for the different object keys in state.ui.filter and the jobs.json  ->  used in prepareFilterState
const __pointToPath = (state=initPointToPath, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const initMapToPath = Map({
    indy: ['param', 'indy'],
    emply: ['param', 'emply'],
    pop: ['param', 'pop'],
});

//  necessary for entering a path in the multiFiltered records
const __mapToPath = (state=initMapToPath, action) => {
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
 *  sortRest: true/[]  
 *      - true: same sort order as in sortOrder, if no sortOrder, sort by filter value
 *      - []: define a different sort order (can also be expressivly the filter value, if sortOrder is defined, 
 *              but should not be the sorting for the rest, e.g. ['city'] for FilterCity)
 *  excl: []  excluded items
*/
const initStateCity = new FilterCity({
    sel: ['S', 'M'],
    // sel: ['F', 'M'],
    // sel: [],
    // sortOrder: ['pop', 'name'],
    sortOrder: ['pop'],
    // sortOrder: ['pop', 'name','DSC'],
    sortByOrder: false,
    // sortByOrder: true,
    // inclRest: false,
    inclRest: true,
    // sortRest: false,
    // sortRest: true,
    // sortRest: ['city'],
    sortRest: ['pop'],
    // sortRest: ['pop', 'DSC'],
    // sortRest: ['text', 'DSC'],
    // sortRest: ['text'],
    excl: []
    // excl: ['K']
});

const city = (state=initStateCity, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateCompIndy = new FilterCompIndustry({
    sel: [2,1],
    // sel: [],
    // sortOrder: [1,2],
    sortOrder: ['text'],
    // sortByOrder: false,
    sortByOrder: true,
    inclRest: true,
    // sortRest: true,
    sortRest: false,
    // excl: [3]
    excl: []
});

const compIndy = (state=initStateCompIndy, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateCompEmply = new FilterCompEmply({
    // sel: [],
    sel: [4,5,6,9],
    // sel: [9,6,5,4],
    // sortOrder: ['emply'],
    sortOrder: ['DSC'],
    sortByOrder: true,
    // sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: []
});

const compEmply = (state=initStateCompEmply, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateJobType = new FilterJobType({
    // sel: [3]
    // sel: []
    sel: [1,2,3],
    sortOrder: ['text'],
    sortByOrder: true
});

const jobType = (state=initStateJobType, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export const filter = combineReducers({
    __order,
    __isMoving,
    __pointToPath,
    __mapToPath,
    city,
    compIndy,
    compEmply,
    jobType,
});


// accessor functions
export const getFilterIsMoving = (state) => state.ui.filter.__isMoving;
export const getFilterOrder = (state) => state.ui.filter.__order;