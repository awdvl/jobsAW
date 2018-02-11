import { Map, fromJS } from 'immutable';
import { FETCH_LOC_COMMON_SUCCESS } from '../constants';

const initState = Map({});

export default (state=initState, action) => {
    switch(action.type) {
        case FETCH_LOC_COMMON_SUCCESS:
                            // console.log('loc_common', action.response);
            return action.response ?
                state.merge(fromJS(action.response)) :
                state;

        // case 'FETCH_CITIES_ERROR':
        default:
            return state;
    }
};
