import { combineReducers } from 'redux';
import { SET_LANGUAGE_SETTINGS } from '../constants/settings';

// --->> change to en in final version
// --> as Map??
const language = (state='de', action) => {
    switch (action.type) {
        case SET_LANGUAGE_SETTINGS:
            return action.payload;

        default:
            return state;
    }
};

// export const getLanguage = (state) => state.settings.language;

export const settings = combineReducers ({
    language,
});