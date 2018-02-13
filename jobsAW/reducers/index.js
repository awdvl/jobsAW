import { combineReducers } from 'redux';

import fetchCtrl from './fetchCtrl';
import cities from './cities';
import companies from './companies';
import locCommon from './loc_common';
import jobs from './jobs';

// import { loadCtrlReducer } from '../utils/loadCtrl';
import loadCtrl from '../utils/loadCtrl';

// console.log('loadCtrl', loadCtrl)
console.log('red loadCtrlReducer', loadCtrl.loadCtrlReducer)
// console.log('loadCtrlReducer', loadCtrlReducer)
const reducers = combineReducers({
    fetchCtrl: loadCtrl.loadCtrlReducer,
    // fetchCtrl,
    cities,
    companies,
    locCommon,
    jobs,
});

export default reducers;
