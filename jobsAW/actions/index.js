import { Promise } from 'core-js';
import * as api from '../api';


export const fetchCities = (dispatch) => {

    return api.fetchCities().then(
        response => {
            dispatch({
                type: 'FETCH_CITIES_SUCCESS',
                response: response  // this into normalizr + immutable
            });
        },
        error => {
            dispatch({
                type: 'FETCH_CITIES_ERROR',
                message: error.message || 'Something went wrong.'
            });
        }
    );
};