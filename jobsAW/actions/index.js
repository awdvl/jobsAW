import * as api from '../api';
import * as consts from '../constants';
import { FETCH_LOC_COMMON_ERROR } from '../constants';


export const fetchCities = (fetched) => (dispatch, getState) => {
    const { FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR } = consts;

    return api.fetchCities(fetched).then(
        response => {
            dispatch({
                type: FETCH_CITIES_SUCCESS,
                fetched,
                response,
            });
        },
        error => {
            dispatch({
                type: FETCH_CITIES_ERROR,
                message: error.message || 'Something went wrong.'
            });
        }
    );
};

export const fetchCompanies = () => (dispatch) => {
    const { FETCH_COMPANIES_SUCCESS, FETCH_COMPANIES_ERROR} = consts;

    return api.fetchCompanies().then(
        response => {
            dispatch({
                type: FETCH_COMPANIES_SUCCESS,
                response
            })
        },
        error => {
            dispatch({
                type: FETCH_COMPANIES_ERROR,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};

export const fetchLocCommon = () => (dispatch) => {
    const { FETCH_LOC_COMMON_SUCCESS, FETCH_LOC_COMMON_ERROR } = consts;

    return api.fetchLocCommon().then(
        response => {
            dispatch({
                type: FETCH_LOC_COMMON_SUCCESS,
                response
            })
        },
        error => {
            dispatch({
                type: FETCH_LOC_COMMON_ERROR,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};

export const fetchJobs = () => (dispatch) => {
    const { FETCH_JOBS_SUCCESS, FETCH_JOBS_ERROR } = consts;

    return api.fetchJobs().then(
        response => {
            dispatch({
                type: FETCH_JOBS_SUCCESS,
                response
            })
        },
        error => {
            dispatch({
                type: FETCH_JOBS_ERROR,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};
