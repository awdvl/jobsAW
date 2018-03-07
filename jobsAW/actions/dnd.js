import UPDATE_FILTER_ORDER from '../constants/dnd';

export const updateOrder = order => {
    return {
        type: UPDATE_FILTER_ORDER,
        payload: order
    };
};