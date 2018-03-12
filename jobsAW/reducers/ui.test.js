import * as reducer from './ui';
import * as types from '../constants/ui';

import { Map } from 'immutable';

describe ('ui modal reducer', () => {
    // describe ('initial state', () => {
    //     it ('should return false', () => {
    //         expect (reducer.modal (undefined, {}).get('isOpen')).toEqual (false);
    //     })
    // })
    describe ('initial state', () => {
        const initStateModal = Map({
            isOpen: false,
            type: ''
        });

        it ('should return false', () => {
            expect (reducer.modal (undefined, {})).toEqual (initStateModal);
        })
    })

    describe ('set isOpen', () => {
        // describe ('as true', () => {
        //     it ('should return true', () => {
        //         expect (reducer.modal (undefined, {
        //             type: types.SET_MODAL_ISOPEN,
        //             payload: true
        //         }).get('isOpen')).toEqual (true);
        //     })

        // });

        // --> rewrite SET_MODAL_ISOPEN to CLOSE_MODAL
        describe ('as false', () => {
            it ('should return false', () => {
                expect (reducer.modal (undefined, {
                    type: types.SET_MODAL_ISOPEN,
                    payload: false
                }).get('isOpen')).toEqual (false);
            })
        });
        
    });

    describe ('set modal type', () => {
        describe('as city', () => {
            it ('should return city', () => {

                expect (reducer.modal (undefined, {
                    type: types.SET_MODAL_TYPE,
                    payload: 'city'
                }).get('type')).toEqual ('city');
            });
        })

    });

    
});