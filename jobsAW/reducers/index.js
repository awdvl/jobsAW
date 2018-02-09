import { combineReducers } from 'redux';
import cities from './cities';
import companies from './companies';

const reducers = combineReducers({
    cities,
    companies
});

export default reducers;

// const cities = (state, action) => {
//     switch(action.type) {
//         case 'FETCH_CITIES_SUCCESS':
//             return action.response;

//         // case 'FETCH_CITIES_ERROR':
//         default:
//             return state;
//     }
// }

// export default cities;