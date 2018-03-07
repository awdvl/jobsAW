import { UPDATE_FILTER_ORDER } from '../constants/dnd';

export const updateOrder = payload => {
                // console.log('payload', payload)
    return {
        type: UPDATE_FILTER_ORDER,
        payload: payload
    };
};