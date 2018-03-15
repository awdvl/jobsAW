import { 
    updateTypes,
    moveTypes,
    UPDATE_FILTER_ISMOVING,
    UPDATE_MOVING_FROM_ZONE,
} from '../constants/filter';


export const setIsMoving = (payload) => ({
    type: UPDATE_FILTER_ISMOVING,
    payload
});

export const setMovingFromZone = (payload) => ({
    type: UPDATE_MOVING_FROM_ZONE,
    payload
});

export const updateOrder = (elem, payload, env, type = '_') => {
                                                        // console.log('+++ updateOrder filter', filter)
    const types = Array.isArray (env) ? moveTypes : updateTypes;

    return {
        type: types[type],
        payload: {
            elem,
            ...payload
        },
        env
    };
};

