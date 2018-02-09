// import {} from 'redux';

const cities = (state, action) => {
    switch(action.type) {
        case 'FETCH_CITIES_SUCCESS':
            return action.response;

        // case 'FETCH_CITIES_ERROR':
        default:
            return state;
    }
}