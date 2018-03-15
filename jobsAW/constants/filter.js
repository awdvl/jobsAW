// export const ItemTypes = {
//     FILTER: 'filterTier0',
//     FILTER1: 'filterTier1'
// };

export const UPDATE_FILTER_ORDER = 'UPDATE_FILTER_ORDER';
export const UPDATE_FILTER_ISMOVING = 'UPDATE_FILTER_ISMOVING';

export const UPDATE_MOVING_FROM_ZONE = 'UPDATE_MOVING_FROM_ZONE';

export const UPDATE_CITY_ORDER = 'UPDATE_CITY_ORDER';

export const MOVE_TO_CITY_ZONE = 'MOVE_TO_CITY_ZONE';

export const filterActionTypes = {
    _: UPDATE_FILTER_ORDER,
    city: UPDATE_CITY_ORDER
};

export const moveTypes = {
    city: MOVE_TO_CITY_ZONE
};