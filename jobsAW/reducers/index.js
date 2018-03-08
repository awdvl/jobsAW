import { combineReducers } from 'redux';

import { settings } from './settings';
import { data } from './fetchData';
import { ui } from './ui';
import { reducerLc, finishedLc } from '../utils/loadCtrl';
// import fetch from '../containers/fetch';

const reducers = combineReducers({
    settings,
    loadCtrl: reducerLc,
    data,
    ui,
});

                                                                        // console.log('reducers', reducers)
export default reducers;

// this necessary??
// export const getAllLoaded = (state) => finishedLc(state.loadCtrl);

