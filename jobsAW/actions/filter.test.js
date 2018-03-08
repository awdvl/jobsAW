import * as actions from './filter';
import * as types from '../constants/filter';

describe ('filter actions', () => {
    it ('should update the filter order', () => {
        const payload = {
            filter: 'city',
            index: 0,
            atIndex: 1
        };

        const expectedAction = {
            type: types.UPDATE_FILTER_ORDER,
            payload: payload
        };

        expect(actions.updateOrder(payload)).toEqual(expectedAction);
    });
});
