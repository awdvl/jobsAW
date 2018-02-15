import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

import { finishedLc } from '../utils/loadCtrl';
import { companies } from '../reducers/fetchData';


// -->> this in a user/(ui?)state
const lang = 'de';


const combineJobData = (state, id) => {
    const jobDetails = state.jobs.get('details');
    const jobsLoc = state.jobs.getIn(['loc', lang]);

    const companies = state.companies;
    const langCommon = state.locCommon.get(lang);
    const cityName = langCommon.getIn([ 'city', 'name']);
    const countryName = langCommon.getIn([ 'country', 'name']);
    const jobType = langCommon.getIn([ 'job', 'type']);
                                                // bug('loopToCombineJobData::langCommon', langCommon)
                                                // bug('loopToCombineJobData::state', state)
                                                // bug('loopToCombineJobData::state.cities', state.cities)
                                                // bug('loopToCombineJobData::state.locCommon', state.locCommon)
    const getJobData = (job) => {
        const jobLoc = jobsLoc.get(job.id +'');
            
        job.text = {
            city: cityName.get(job.city),
            country: countryName.get(job.country),
            company: companies.getIn([ job.company, 'name' ]),
            type: jobType.get(job.type +''),
            title: jobLoc.get('title'),
            intro: jobLoc.get('intro'),
        };

        return job;
    };


    return id ?
        [getJobData(jobDetails[id + ''])] :
        jobDetails.map(getJobData).toArray();

}


const getJobsDetails = (state, props) => {
    if (finishedLc(state)) {
                                                                // bug.rt('===>> selector fired state', state)
        return combineJobData(state);
    }

    return null;

}

export const getJobs = createSelector(
    getJobsDetails,

    (jobDetails) => {
                                // bug.rt('+++++++++++ selectore called -> jobDetails', jobDetails)
        return jobDetails;
    }
);