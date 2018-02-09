// import { List, Map, Record, fromJS } from 'immutable';
// import { normalize } from 'normalizr';
// import * as schema from '../normalizers';
import * as api from '../api';
import * as consts from '../constants';

// import City from '../records/City';

const bug = console.log


// const mergeEntities = (state, newCity) => 
//     state.merge(newCity.map((city) => new City(city)));


export const fetchCities = (fetched) => (dispatch, getState) => {
    const { FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR } = consts;
    // bug('actions getState', getState());
    const state = getState();

    return api.fetchCities(fetched).then(
        response => {
            // bug('actions response', response);
            // bug('actions normalized response', normalize(response, schema.city))

            // const CityRecord = Record({
            //     size: undefined,
            //     state: undefined,
            //     loc: ''
            // })
            // const cityRecord = new CityRecord(response);

            // bug('actions Record', cityRecord)
            // bug('fromJs', fromJS(response));
            // bug('merged', mergeEntities(state, fromJS(response)));

            const data = response;
            // const data = { cities: response};

            dispatch({
                // type: 'FETCH_CITIES_SUCCESS',
                type: FETCH_CITIES_SUCCESS,
                fetched,
                response: data  // this into normalizr + immutable
            });
        },
        error => {
            dispatch({
                // type: 'FETCH_CITIES_ERROR',
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
            const data = response;

            dispatch({
                // type: 'FETCH_COMPANIES_SUCCESS',
                type: FETCH_COMPANIES_SUCCESS,
                response: data  // this into normalizr + immutable
            })
        },
        error => {
            dispatch({
                // type: 'FETCH_COMPANIES_ERROR',
                type: FETCH_COMPANIES_ERROR,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};
