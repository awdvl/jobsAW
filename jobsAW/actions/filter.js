import { 
    filterActionTypes,
    moveTypes,
    UPDATE_FILTER_ISMOVING,
} from '../constants/filter';


export const setIsMoving = (payload) => ({
    type: UPDATE_FILTER_ISMOVING,
    payload
});

export const updateOrder = (elem, payload, env, type = '_') => {
                                                        // console.log('+++ updateOrder filter', filter)
    const types = Array.isArray(env) ? moveTypes : filterActionTypes;

    return {
        // type: filterActionTypes[type],
        type: types[type],
        payload: {
            elem,
            ...payload
        },
        env
    };
};

// export const updateOrder = (elem, payload, env, type = '_', newEnv) => {

//     if (newEnv) {
//         env = [env, newEnv];
//     }
//                                                         // console.log('+++ updateOrder filter', filter)
//     return {
//         type: filterActionTypes[type],
//         payload: {
//             elem,
//             ...payload
//         },
//         env
//     };
// };

export const moveToZone = (elem, payload, env, type) => {

    return {
        type: moveTypes[type],
        payload: {
            elem,
            ...payload
        },
        env
    };
};
