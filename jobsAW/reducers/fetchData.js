import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import buildDumbDataReducer from '../utils/buildDumbDataReducer';
import { 
    FETCH_CITIES_SUCCESS, 
    FETCH_COMPANIES_SUCCESS,
    FETCH_LOC_COMMON_SUCCESS, 
    FETCH_LOC_COMMON_ERROR,
    FETCH_JOBS_SUCCESS, 
} from '../constants/fetch'


const initState = fromJS({details:{}, loc:{}});

export const jobs = (state=initState, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            return action.data ?
                state.mergeDeep(action.data) :
                state;

        default:
            return state;
    }
};

export const cities = buildDumbDataReducer(FETCH_CITIES_SUCCESS);
export const companies = buildDumbDataReducer(FETCH_COMPANIES_SUCCESS);
export const Loc_common = buildDumbDataReducer(FETCH_LOC_COMMON_SUCCESS, FETCH_LOC_COMMON_ERROR, 'mergeDeep');

// export default combineReducers({
//     cities,
//     companies,
//     Loc_common,
//     jobs
// });