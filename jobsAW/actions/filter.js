import { UPDATE_FILTER_ORDER } from '../constants/filter';

export const updateOrder = payload => {
    return {
        type: UPDATE_FILTER_ORDER,
        payload: payload
    };
};

export const updateIsDragging = payload => ({
    type: 'UPDATE_ISDRAGGING',
    payload
});