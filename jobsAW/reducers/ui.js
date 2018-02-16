import { combineReducers } from 'redux';
import { filter } from './filter';

export const ui = combineReducers({
    filter,
});

 