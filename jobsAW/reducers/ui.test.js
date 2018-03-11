import * as reducer from './ui';
import * as types from '../constants/ui';

import { Map } from 'immutable';

describe ('ui modal reducer', () => {
    describe ('initial state', () => {
        const initState = Map ({isOpen:false});

        it ('should return false', () => {
            expect (reducer.modal (undefined, {})).toEqual (initState);
        })
    })

    describe ('set isOpen', () => {
        describe ('as true', () => {

            it ('should return true', () => {
                const finalState = Map ({isOpen: true});

                expect (reducer.modal (undefined, {
                    type: types.SET_MODAL_ISOPEN,
                    payload: true
                })).toEqual (finalState);
            })

        });

        describe ('as false', () => {
            it ('should return false', () => {
                const finalState = Map ({isOpen: false});
                
                expect (reducer.modal (undefined, {
                    type: types.SET_MODAL_ISOPEN,
                    payload: false
                })).toEqual (finalState);
            })
        });
        
    })
    
});