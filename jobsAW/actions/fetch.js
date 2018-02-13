import { Map, fromJS } from 'immutable';
import * as api from '../api';
import * as consts from '../constants/fetch';
import reviverFor from '../utils/reviverFor';

import City from '../records/City';
import Company from '../records/Company';
import Jobs from '../records/Jobs';
import JobsLoc from '../records/JobsLoc';


export const fetchCtrl = n => (dispatch) => {
    dispatch({
        type: consts.FETCH_CTRL_SET_NUMBER,
        payload: n
    });
}

export const fetchCities = (fetched) => (dispatch, getState) => {
    const { FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR } = consts;

    return api.fetchCities(fetched).then(
        response => {
            dispatch({
                type: FETCH_CITIES_SUCCESS,
                fetched,
                data: fromJS(response, reviverFor(City)),
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
                data: fromJS(response, reviverFor(Company)),
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
                data: fromJS(response),
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
    const { FETCH_CTRL_INCREMENT, FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_ERROR } = consts;

    // dispatch({
    //     type: FETCH_JOBS_REQUEST
    // });


    return api.fetchJobs().then(
        response => {
            dispatch({
                type: FETCH_CTRL_INCREMENT
            });
                    
            const recordCondition = key => key.length > 3;

            // ---> data in payload??
            dispatch({
                type: FETCH_JOBS_SUCCESS,
                data: Map({
                    details: fromJS(response.details, reviverFor(Jobs, recordCondition)),
                    loc: fromJS(response.loc, reviverFor(JobsLoc, recordCondition))
                }),
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

