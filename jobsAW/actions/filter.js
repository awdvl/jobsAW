import { UPDATE_FILTER_ORDER } from '../constants/filter';

export const updateOrder = payload => {
    return {
        type: UPDATE_FILTER_ORDER,
        payload: payload
    };
};