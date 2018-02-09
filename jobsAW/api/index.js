import {Promise} from 'core-js';
import cities from '../_data/cities';
import companies from '../_data/companies';
import jobs from '../_data/jobs';
import commonLoc from '../_loc/common';
// import { resolve } from 'path';
// import { setTimeout } from 'core-js/library/web/timers';

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
    
export const fetchCommonLoc = () => (
    delay(500).then(() => {
        return commonLoc;
    })
)
    
export const fetchJobs = () => (
    delay(500).then(() => {
        return jobs;
    })
)
    