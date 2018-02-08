import {Promise} from 'core-js';
import cities from '../_data/cities';
import companies from '../_data/companies';
import jobs from '../_data/jobs.json';
import commonLoc from '../_loc/common.json';
// import { resolve } from 'path';
// import { setTimeout } from 'core-js/library/web/timers';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCities = () => 
    delay(500).then(() => {
        return cities;
    });