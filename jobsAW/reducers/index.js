import { combineReducers } from 'redux';

// import cities from './cities';
// import companies from './companies';
// import locCommon from './loc_common';
// import jobs from './jobs';

// import * as fetchData from './fetchData';
import * as fetchData from './fetchData';
import { reducerLc, finishedLc } from '../utils/loadCtrl';
import fetch from '../containers/fetch';

console.log('fetchData', fetchData)

// const reducersFetch = combineReducers({
//     ...fetchData,
// });
// console.log('reducersFetch', reducersFetch)

const reducers = combineReducers({
    loadCtrl: reducerLc,
    ...fetchData,
    // reducersFetch,    
});

// const reducers = combineReducers({
//     ...fetchData,
//     // fetchData,
//     loadCtrl: reducerLc,
// });
console.log('reducers', reducers)

// const reducers = combineReducers({
//     loadCtrl: reducerLc,
//     cities,
//     companies,
//     locCommon,
//     jobs,
// });

export default reducers;

// this necessary??
// export const getAllLoaded = (state) => finishedLc(state.loadCtrl);

