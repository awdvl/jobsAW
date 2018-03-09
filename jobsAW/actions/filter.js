import { UPDATE_FILTER_ORDER, UPDATE_FILTER_ISMOVING } from '../constants/filter';

export const updateOrder = payload => {
    return {
        type: UPDATE_FILTER_ORDER,
        payload: payload
    };
};

export const setIsMoving = payload => ({
    type: UPDATE_FILTER_ISMOVING,
    payload
});