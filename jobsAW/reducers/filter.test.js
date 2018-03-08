import * as reducer from './filter';
import * as types from '../constants/filter';

import { List } from 'immutable';

describe ('filter reducer', () => {
    describe ('__order', () => {
        const initialState = List(['city', 'compIndy', 'jobType', 'compEmply']);
        const state_citySwapped = List(['compIndy', 'city', 'jobType', 'compEmply']);
        const state_jobTypeSwapped = List(['compIndy', 'jobType', 'city', 'compEmply']);
        
        const payload_swapCity = {
            filter: 'city',
            index: 0,
            atIndex: 1
        };

        const payload_swapJobType = {
            filter: 'jobType',
            index: 2,
            atIndex: 1
        };

        it ('should return the initial state', () => {
            expect (reducer.__order (undefined, {})).toEqual (initialState);
        });

        describe ('update order', () => {
            it ('should swap city backward', () => {
                expect (reducer.__order (initialState, {
                    type: types.UPDATE_FILTER_ORDER,
                    payload: payload_swapCity
                })).toEqual (state_citySwapped)
            })
    
            it ('should swap jobType forward', () => {
                expect (reducer.__order (state_citySwapped, {
                    type: types.UPDATE_FILTER_ORDER,
                    payload: payload_swapJobType
                })).toEqual (state_jobTypeSwapped)
            });
    
        });


    });
});
