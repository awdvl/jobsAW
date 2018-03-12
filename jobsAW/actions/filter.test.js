import * as actions from './filter';
import * as types from '../constants/filter';

describe ('filter actions', () => {
    it ('should update the filter order', () => {
        const filter = 'city';

        const payload = {
            index: 0,
            atIndex: 1
        };

        const expectedAction = {
            type: types.UPDATE_FILTER_ORDER,
            payload: {
                filter,
                ...payload
            }            
        };

        expect(actions.updateOrder(filter, payload)).toEqual(expectedAction);
    });
});
