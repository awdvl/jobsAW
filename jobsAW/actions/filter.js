import { 
    filterActionTypes,
    UPDATE_FILTER_ISMOVING,
} from '../constants/filter';


export const setIsMoving = (payload) => ({
    type: UPDATE_FILTER_ISMOVING,
    payload
});

export const updateOrder = (elem, payload, env, type = '_') => {
                                                        // console.log('+++ updateOrder filter', filter)
    return {
        type: filterActionTypes[type],
        payload: {
            elem,
            ...payload
        },
        env
    };
};
