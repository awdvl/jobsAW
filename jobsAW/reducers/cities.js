// import { Map } from 'immutable';
import { FETCH_CITIES_SUCCESS } from '../constants/fetch'
// import City from '../records/City';
// import asMapRecord from '../utils/asMapRecord';
// import buildSimpleDataReducer from '../utils/buildSimpleDataReducer';
import buildDumbDataReducer from '../utils/buildDumbDataReducer';

export default buildDumbDataReducer(FETCH_CITIES_SUCCESS);
// export default buildSimpleDataReducer(FETCH_CITIES_SUCCESS, City);

// const initState = Map({});

// const cities = (state=initState, action) => {
//     switch(action.type) {
//         case FETCH_CITIES_SUCCESS:
//             return action.response ?
//                 asMapRecord(City, state, action.response) :
//                 state;

//         // case 'FETCH_CITIES_ERROR':
//         default:
//             return state;
//     }
// }

// export default cities;