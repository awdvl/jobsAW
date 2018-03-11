import { SET_MODAL_ISOPEN } from '../constants/ui';

export const setModalIsOpen = open => ({
    type: SET_MODAL_ISOPEN,
    payload: open
});
