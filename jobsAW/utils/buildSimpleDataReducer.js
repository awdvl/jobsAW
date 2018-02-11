import { Map } from 'immutable';
import asMapRecord from './asMapRecord';

export default (successActionType, recordClass) => {
    const initState = Map({});

    return (state=initState, action) => {
        switch(action.type) {
            case successActionType:
                return action.response ?
                    asMapRecord(recordClass, state, action.response) :
                    state;

            // case 'FETCH_CITIES_ERROR':
            default:
                return state;
        }
    };
};
