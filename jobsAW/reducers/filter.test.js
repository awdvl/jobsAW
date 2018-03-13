import * as reducer from './filter';
import * as types from '../constants/filter';

import FilterCity from '../records/FilterCity';


import { List } from 'immutable';

describe ('filter reducer', () => {
    describe ('__order', () => {
        const initialState = List(['city', 'compIndy', 'jobType', 'compEmply']);
        const endState_citySwapped = List(['compIndy', 'city', 'jobType', 'compEmply']);
        const endState_jobTypeSwapped = List(['compIndy', 'jobType', 'city', 'compEmply']);
        
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
                })).toEqual (endState_citySwapped)
            })
    
            it ('should swap jobType forward', () => {
                expect (reducer.__order (endState_citySwapped, {
                    type: types.UPDATE_FILTER_ORDER,
                    payload: payload_swapJobType
                })).toEqual (endState_jobTypeSwapped)
            });
    
        });


    });

    describe ('city', () => {
        const initialState = new FilterCity({
            sel: ['S', 'M'],
            // sel: List(['S', 'M']),
            sortOrder: ['pop'],
            sortByOrder: false,
            inclRest: true,
            sortRest: ['pop'],
            excl: []
            // excl: ['K']
        });        

        const endState_selSwapped = new FilterCity({
            sel: ['M', 'S'],
            // sel: List(['M', 'S']),
            sortOrder: ['pop'],
            sortByOrder: false,
            inclRest: true,
            sortRest: ['pop'],
            excl: []
        });

        const payload_swapSel = {
            filter: 'S',
            index: 0,
            atIndex: 1
        };

        it ('should return the initial state', () => {
            expect (reducer.city (undefined, {})).toEqual (initialState);

        });

        describe ('update order', () => {
            describe('for selected filters sel', () => {
                it ('should swap the first two elems', () => {
                    expect (reducer.city (initialState, {
                        type: types.UPDATE_CITY_ORDER,
                        zone: 'sel',
                        payload: payload_swapSel
                    })).toEqual (endState_selSwapped);
                });
              
            });
            
          
        });
        
    });
    
});
