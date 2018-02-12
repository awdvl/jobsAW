import { fromJS } from 'immutable';
import { FETCH_JOBS_SUCCESS } from '../constants';
import Jobs from '../records/Jobs';
import JobsDesc from '../records/JobsDesc';
import asMapRecord, { getReviver } from '../utils/asMapRecord';


const initState = fromJS({details:{}, loc:{}});

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            if (action.response) {
                return state.merge({
                    details: asMapRecord(state.get('details'), action.response.details, getReviver(Jobs)),
                    loc: asMapRecord(state.get('loc'), action.response.loc, 
                            getReviver(JobsDesc, key => key.length > 3), 'mergeDeep')  // country acronyms max 3
                });
            }

            return state;

        default:
            return state;
    }
};