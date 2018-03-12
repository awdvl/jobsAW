import { combineReducers } from 'redux';
import { filter } from './filter';

import { Map } from 'immutable';
import { SET_MODAL_ISOPEN, SET_MODAL_TYPE } from '../constants/ui';


const initStateModal = Map({
    isOpen: false,
    type: ''
});

export const modal = (state=initStateModal, action) => {
    switch (action.type) {
        // close
        case SET_MODAL_ISOPEN:
            // return state.set ('isOpen', action.payload);
            return state.set ('type', '').set ('isOpen', false);

        // open
        case SET_MODAL_TYPE: 
            // return state.set ('type', action.payload);
            return state.set ('type', action.payload).set ('isOpen', true);

        default:
            return state;
    }
};

export const getModalIsOpen = (state) => state.ui.modal.get('isOpen');
export const getModalType = (state) => state.ui.modal.get('type');


export const ui = combineReducers({
    filter,
    modal,
});

 