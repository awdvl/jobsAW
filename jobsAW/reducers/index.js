import { combineReducers } from 'redux';

import fetchCtrl from './fetchCtrl';
import cities from './cities';
import companies from './companies';
import locCommon from './loc_common';
import jobs from './jobs';

const reducers = combineReducers({
    fetchCtrl,
    cities,
    companies,
    locCommon,
    jobs,
});

export default reducers;
