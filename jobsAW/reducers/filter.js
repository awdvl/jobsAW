import { combineReducers } from 'redux';
import { List, Map, fromJS, Iterable } from 'immutable';
import FilterCity from '../records/FilterCity';
import FilterJobType from '../records/FilterJobType';
import FilterCompIndustry from '../records/FilterCompIndustry';
import FilterCompEmply from '../records/FilterCompEmply';

import R from 'ramda';

import { 
    updateTypes,
    moveTypes,
    onlyTopTypes,
    UPDATE_FILTER_ISMOVING,
    UPDATE_ISMOVING_FROM_ZONE,
} from '../constants/filter';

import bug from '../../_libs/bug';

// const initStateOrder = List(['city', 'compIndy']);
// const initStateOrder = List(['city', 'compIndy', 'jobType']);

const initStateOrder = List(['city', 'compIndy', 'jobType', 'compEmply']);
// const initStateOrder = List(['compIndy', 'city', 'jobType', 'compEmply']);

export const __order = (state=initStateOrder, action) => {
    switch (action.type) {
        // UPDATE_FILTER_ORDER:
        case updateTypes._:
            // return state.splice(action.payload.index, 1).splice(action.payload.atIndex, 0, action.payload.filter);
            return swapOrder (state, action);

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

export const __movingFromZone = (state=null, action) => {
    switch (action.type) {
        case UPDATE_ISMOVING_FROM_ZONE:
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
    sel: List(['S', 'M']),
    // sel: ['S', 'M'],
    // sel: ['F', 'M'],
    // sel: [],
    // sortOrder: ['pop', 'name'],
    sortOrder: List(['pop']),
    // sortOrder: ['pop', 'name','DSC'],
    sortByOrder: false,
    // sortByOrder: true,
    // inclRest: false,
    inclRest: true,
    // sortRest: false,
    // sortRest: true,
    // sortRest: ['city'],
    // sortRest: ['pop'],
    sortRest: List(['pop']),
    // sortRest: ['pop', 'DSC'],
    // sortRest: ['text', 'DSC'],
    // sortRest: ['text'],
    // excl: []
    // excl: ['K']
    // excl: List(['K'])
    excl: List([])
});



// immutable array swap
// const swapInArray = (arrayOrg, {filter, index, atIndex}) => {
//     const array = [...arrayOrg];
//     array[index] = array[atIndex];
//     array[atIndex] = filter;

//     return array;
// }


// this in helper with a higher order switch, checking if it is a swap, a delete or a insert
const swapOrder = (state, action) => 
    state
        .set (action.payload.index, state.get (action.payload.atIndex))
        .set (action.payload.atIndex, action.payload.elem);

const updateZone = (state, action) => 
    state.set (action.env[0], swapOrder (state.get (action.env[0]), action));

const moveToZone = (state, action) => {
    const fromZone = state.get (action.env[0]);
    const toZone = state.get (action.env[1]);
                                    // bug('*** fromZone', fromZone); bug('*** moveToZOne state, action', state, action)
                                    // bug('## action.payload.atIndex', action.payload.atIndex)
    const newState = state
        .set (action.env[0], fromZone.delete (action.payload.index))
        .set (action.env[1], toZone.insert (action.payload.atIndex, action.payload.elem))
        // .set (action.env[0], fromZone.splice (action.payload.index, 1))
        // .set (action.env[1], toZone.splice (action.payload.atIndex, 0, action.payload.elem))

    return newState;
};

export const city = (state=initStateCity, action) => {
    switch (action.type) {
        // UPDATE_CITY_ORDER:
        case updateTypes.city:
            return updateZone (state, action);

        case moveTypes.city:
            return moveToZone (state, action);

        case onlyTopTypes.city:
            return state.set ('inclRest', !state.inclRest);

        default:
            return state;
    }
};


const initStateCompIndy = new FilterCompIndustry({
    sel: List ([2,1]),
    // sel: [],
    // sortOrder: [1,2],
    sortOrder: List (['text']),
    // sortByOrder: false,
    sortByOrder: true,
    inclRest: true,
    // sortRest: true,
    sortRest: false,
    // excl: [3]
    excl: List ([])
});

const compIndy = (state=initStateCompIndy, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateCompEmply = new FilterCompEmply({
    // sel: [],
    sel: List ([4,5,6,9]),
    // sel: [9,6,5,4],
    // sortOrder: ['emply'],
    // sortOrder: ['DSC'],
    sortOrder: List (['DSC']),
    sortByOrder: true,
    // sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: List ([])
});
// const initStateCompEmply = new FilterCompEmply({
//     // sel: [],
//     sel: [4,5,6,9],
//     // sel: [9,6,5,4],
//     // sortOrder: ['emply'],
//     // sortOrder: ['DSC'],
//     sortOrder: ['DSC'],
//     sortByOrder: true,
//     // sortByOrder: false,
//     inclRest: false,
//     sortRest: true,
//     excl: []
// });

const compEmply = (state=initStateCompEmply, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const initStateJobType = new FilterJobType({
    // sel: [3]
    // sel: []
    sel: List ([1,2,3]),
    sortOrder: List (['text']),
    sortByOrder: true,
    inclRest: false,
    sortRest: true,
    excl: List ([])
});
// const initStateJobType = new FilterJobType({
//     // sel: [3]
//     // sel: []
//     // sel: [1,2,3],
//     // sel: List ([1,2,3]),
//     sel: List ([1,2]),
//     sortOrder: ['text'],
//     sortByOrder: true,
//     // inclRest: false,
//     // sortRest: true,
//     excl: List ([3])
// });

const jobType = (state=initStateJobType, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export const filter = combineReducers({
    __order,
    __isMoving,
    __movingFromZone,
    __pointToPath,
    __mapToPath,
    city,
    compIndy,
    compEmply,
    jobType,
});


// accessor functions
export const getFilterIsMoving = (state) => state.ui.filter.__isMoving;
export const getMovingFromZone = (state) => state.ui.filter.__movingFromZone;

export const getFilterOrder = (state) => state.ui.filter.__order;

export const getFilterZoneFor = (state) => (filter, zone) => state.ui.filter[filter].get(zone);
export const getFilterOnlyTop = (state) => (filter) => !state.ui.filter[filter].inclRest
