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
            elem: 'city',
            index: 0,
            atIndex: 1
        };

        const payload_swapJobType = {
            elem: 'jobType',
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
            sel: List(['S', 'M']),
            sortOrder: List(['pop']),
            sortByOrder: false,
            inclRest: true,
            sortRest: List(['pop']),
            // excl: List([])
            excl: List(['K'])
        });        

        const endState_selSwapped = new FilterCity({
            sel: List(['M', 'S']),
            sortOrder: List(['pop']),
            sortByOrder: false,
            inclRest: true,
            sortRest: List(['pop']),
            // excl: List([])
            excl: List(['K'])
        });

        const endState_movedFromSelToExcl = new FilterCity({
            sel: List(['M']),
            sortOrder: List(['pop']),
            sortByOrder: false,
            inclRest: true,
            sortRest: List(['pop']),
            excl: List(['K', 'S'])
        })

        const payload_swapSel = {
            elem: 'S',
            index: 0,
            atIndex: 1
        };

        const payload_moveSelToExcl = {
            elem: 'S',
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
                        env: 'sel',
                        payload: payload_swapSel
                    })).toEqual (endState_selSwapped);
                });
              
            });
          
        });

        describe ('move between zones', () => {
            describe('from sel to excl', () => {
                it ('should move S', () => {
                    expect (reducer.city (initialState, {
                        type: types.moveTypes.city,
                        env: ['sel', 'excl'],
                        payload: payload_moveSelToExcl
                    })).toEqual (endState_movedFromSelToExcl);
                });
              
            })
            
        })
        
    });
    
});
