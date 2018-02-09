import { List, Map, Record, fromJS, isValueObject } from 'immutable';
import { FETCH_CITIES_SUCCESS } from '../constants';
import City from '../records/City';


const bug = console.log

// const initState = new Record({});
const initState = Map({});
// const initState = fromJS({}, reviver);
// const initState = new Map();

// const mergeEntities = (state, newCity) => {
//     bug('newCity', newCity)

//     state.merge(newCity.map((city) => {
//         bug('city', city)
//         bug('City', City)
//         bug('record', new City(city))

//         // return new City(city);
//     }));

//     return state;
// }

const reviver = (key, value) => {
    // bug('key', key, value)
    return value === Object(value) ?
        City(value):
        value;
};

const asRecord = (data) => 
    fromJS(data, reviver);
// const asRecord = (state, data) => 
//     // fromJS(data, reviver);
//     state.merge(fromJS(data, reviver));
//     // state.mergeDeep(fromJS(data, reviver));

// const cities = (state={}, action) => {
const cities = (state=initState, action) => {
    // console.log('action.type', action.type)

    switch(action.type) {
        case FETCH_CITIES_SUCCESS:
                    // console.log('action', action)
                    // bug('fromJs', fromJS(action.response));
                    bug('fromJs', fromJS(action.response, reviver));
                    // bug('Map fromJs', new City(fromJS(action.response)));
                    // bug('merged', mergeEntities(state, fromJS(action.response)));
            return action.response ?
                asRecord(action.response) :
                // asRecord(state, action.response) :
                state;

            // return action.response;

        // case 'FETCH_CITIES_ERROR':
        default:
            return state;
    }
}

export default cities;