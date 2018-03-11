import * as actions from './ui';
import * as types from '../constants/ui';

describe ('ui modal actions', () => {
    describe ('set isOpen', () => {
        it ('should pass payload true', () => {
            expect (actions.setModalIsOpen (true)).toEqual({
                type: types.SET_MODAL_ISOPEN,
                payload: true
            });
        });

        it ('should pass payload false', () => {
            expect (actions.setModalIsOpen (false)).toEqual({
                type: types.SET_MODAL_ISOPEN,
                payload: false
            });
        });
    })
    
});
