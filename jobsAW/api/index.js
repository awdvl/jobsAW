import {Promise} from 'core-js';
import cities from '../_data/cities';
import companies from '../_data/companies';
import jobs from '../_data/jobs';
import locCommon from '../_loc/common';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCities = (fetched) => 
    delay(500).then(() => {
        return cities;
    });

export const fetchCompanies = () => (
    delay(500).then(() => {
        return companies;
    })
)
    
export const fetchLocCommon = () => (
    delay(500).then(() => {
        return locCommon;
    })
)
    
export const fetchJobs = () => (
    delay(500).then(() => {
        return jobs;
    })
)
    