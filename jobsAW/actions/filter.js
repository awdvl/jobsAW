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

/**
 * 
 * @param {string/number} elem 
 * @param {object} payload 
 * @param {array/undefined} env  -  undefined (no zones), 
 *                                      [] (drop outside), [x] (multiple zones, no zone move), [x,y] (intra zones move)
 * @param {string} type 
 */
export const updateOrder = (elem, payload, env, type = '_') => {
                                                        // console.log('+++ updateOrder filter', filter)
    const withInZone = !env || env.length === 1;

    const types = withInZone ?
        updateTypes :
            env[1] ?
                moveTypes :
                null;
                        
    return {
        type: types ? types[type] : null,
        payload: {
            elem,
            ...payload
        },
        env
    };
};

