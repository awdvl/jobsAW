import { fromJS } from 'immutable';
import { FETCH_JOBS_SUCCESS } from '../constants/fetch';

const initState = fromJS({details:{}, loc:{}});

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            return action.data ?
                state.mergeDeep(action.data) :
                state;

        default:
            return state;
    }
};