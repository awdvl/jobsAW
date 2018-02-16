import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

import combineRichJobData from './combineRichJobData';
import { finishedLc } from '../utils/loadCtrl';
                                                                            // bug('selectors::state', state)

const getLanguage = (state) => state.settings.language;
const getData = (state) => state.data;
const getLoadingFinished = (state) => finishedLc(state);

// ---> this to connect with the ui reducer data, when defined
const getId = (state) => state.id;


export const getRichJobData = createSelector(
// export default createSelector(
    getLoadingFinished,
    getLanguage,
    getData,
    getId,

    (loadingFinished, language, data, id) => {
        if (loadingFinished) {
                                                                        // bug.rt('===>> selector fired state', state)
            return combineRichJobData(language, data, id);
        }
        
        return [];
        // return null;
    }
);

// export const getRichJobData2 = createSelector(
// // export default createSelector(
//     getLoadingFinished,
//     getLanguage,
//     getData,
//     getId,

//     (loadingFinished, language, data, id) => {
//         if (loadingFinished) {
//                                                                         // bug.rt('===>> selector fired state', state)
//             return combineRichJobData(language, data, id);
//         }
        
//         return null;
//     }
// );

// export const getRichJobData = createSelector(
//     getRichJobData2,

//     (richJobData3) => (richJobData3.filter((elem) => {
//             // bug('record', record)
//             return true;
//     }))
// );