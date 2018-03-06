import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

import pickFilterLoc from './pickFilterLoc';
import transformToRichJobData from './transformToRichJobData';
import { finishedLc } from '../utils/loadCtrl';
                                                                            // bug('selectors::state', state)

const getLanguage = (state) => state.settings.language;
const getData = (state) => state.data;
const getLoadingFinished = (state) => finishedLc(state);

// ---> this to connect with the ui reducer data, when defined
const getId = (state) => state.id;


export const getRichJobData = createSelector(
    getLoadingFinished,
    getLanguage,
    getData,
    getId,

    (loadingFinished, language, data, id) => {
        if (loadingFinished) {
                                                                        // bug.rt('===>> selector fired state', state)
            return transformToRichJobData(language, data, id);
        }
        
        return [];
    }
);

export const getLoc = createSelector(
    getLoadingFinished,
    getLanguage,
    getData,

    (loadingFinished, language, data) => {
        if (loadingFinished) {
            return pickFilterLoc(language, data);
        }

        return {};
    }
);
