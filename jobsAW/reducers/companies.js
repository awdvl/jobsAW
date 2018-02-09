import { FETCH_COMPANIES_SUCCESS } from '../constants';

const companies = (state={}, action) => {
    switch(action.type) {
        case FETCH_COMPANIES_SUCCESS:
            return action.response;

        default:
            return state;
    }
}

export default companies;