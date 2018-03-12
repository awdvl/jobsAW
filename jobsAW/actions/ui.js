import { SET_MODAL_ISOPEN, SET_MODAL_TYPE } from '../constants/ui';

export const setModalIsOpen = open => ({
    type: SET_MODAL_ISOPEN,
    payload: open
});

export const setModalType = typeName => ({
    type: SET_MODAL_TYPE,
    payload: typeName
});


export const closeModal = () => setModalIsOpen(false);