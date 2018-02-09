import { normalize } from 'normalizr';
import * as schema from '../normalizers';

// import { Promise } from 'core-js';
import * as api from '../api';

const bug = console.log

export const fetchCities = (fetched) => (dispatch, getState) => {

    // bug('actions getState', getState());

    return api.fetchCities(fetched).then(
        response => {
            // bug('actions response', response);
            // bug('actions normalized response', normalize(response, schema.city))

            // const data = response;
            const data = { cities: response};

            dispatch({
                type: 'FETCH_CITIES_SUCCESS',
                fetched,
                response: data  // this into normalizr + immutable
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

export const fetchCompanies = () => (dispatch) => {
    return api.fetchCompanies().then(
        response => {
            const data = response;

            dispatch({
                type: 'FETCH_COMPANIES_SUCCESS',
                response: data  // this into normalizr + immutable
            })
        },
        error => {
            dispatch({
                type: 'FETCH_COMPANIES_ERROR',
                message: error.message || 'Something went wrong.'
            })
        }
    );
};
