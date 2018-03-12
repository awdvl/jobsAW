import { 
    UPDATE_FILTER_ORDER, UPDATE_FILTER_ISMOVING,
    UPDATE_CITY_ORDER
} from '../constants/filter';

// export const updateOrder = payload => {
//     return {
//         type: UPDATE_FILTER_ORDER,
//         // payload: payload
//         payload: {
//             filter: payload.elem,
//             ...payload
//         }
//     };
// };
export const updateOrder = (filter, payload) => {
                                                        console.log('updateOrder filter', filter)
    // add additional param filterEnv                                                    
    // -> here: get filter type by filter
    const filterTypes = {
        __order: UPDATE_FILTER_ORDER,
        city: UPDATE_CITY_ORDER
    };

    return {
        type: UPDATE_FILTER_ORDER,
        // type: filterTypes[filter],
        payload: {
            filter,
            ...payload
        }
    };
};

export const setIsMoving = (payload) => ({
    type: UPDATE_FILTER_ISMOVING,
    payload
});