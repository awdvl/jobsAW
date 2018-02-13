import { fromJS } from 'immutable';
import { FETCH_JOBS_SUCCESS, FETCH_JOBS_REQUEST, FETCH_JOBS_ERROR } from '../constants/fetch';


// const isFetching = (state=false, action) => {
//     switch (action.type) {
//         case FETCH_JOBS_REQUEST:
//             return true;
//         case FETCH_JOBS_SUCCESS:
//         case FETCH_JOBS_ERROR:
//             return false;
//         default:
//             return state;
//     }
// };

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