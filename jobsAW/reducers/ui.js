import { combineReducers } from 'redux';
import { filter } from './filter';

import { Map } from 'immutable';
import { SET_MODAL_ISOPEN } from '../constants/ui';


const intiStateModal = Map({
    isOpen: false
});

export const modal = (state=intiStateModal, action) => {
    switch (action.type) {
        case SET_MODAL_ISOPEN:
            return state.set ('isOpen', action.payload);

        default:
            return state;
    }
};

export const getModalIsOpen = (state) => state.ui.modal.get('isOpen');

export const ui = combineReducers({
    filter,
    modal,
});

 