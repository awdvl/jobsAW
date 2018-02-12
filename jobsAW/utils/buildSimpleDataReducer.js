import { Map } from 'immutable';
import asMapRecord, { getReviver } from '../utils/asMapRecord';

export default (successActionType, recordClass) => {
    const initState = Map({});

    return (state=initState, action) => {
        switch(action.type) {
            case successActionType:
                return action.response ?
                    asMapRecord(state, action.response, getReviver(recordClass)) :
                    state;

            // case 'FETCH_CITIES_ERROR':
            default:
                return state;
        }
    };
};
