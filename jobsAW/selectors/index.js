import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

import { finishedLc } from '../utils/loadCtrl';

// const bug = console.log;

// -->> this in a user/(ui?)state
const lang = 'de';

const loopToCombineJobData = (state, id) => {
    bug('loopToCombineJobData::state', state)
    bug('loopToCombineJobData::state.cities', state.cities)
    bug('loopToCombineJobData::state.locCommon', state.locCommon)
    const langCommon = state.locCommon.get(lang);
    
    bug('loopToCombineJobData::langCommon', langCommon)

    if (!id) {
        const jobDetails = state.jobs.get('details');

        // Object.assign(...Object.entries(obj).map(([k, v]) => ({[k]: v * v})));

        const newMap = jobDetails.map((job, key) => {
            const newValue = job;

            bug('loopToCombineJobData:: --> job', job, job.city)
            
            job.text = {
                city: langCommon.getIn([ 'city', 'name', job.city ])
            }

            return {[key]: newValue}
            
        })

        bug('loopToCombineJobData::newMap', newMap)
        const newObj = newMap.toObject();
        const newJS = newMap.toJS();

        bug('loopToCombineJobData::newObj', newObj)
        bug('loopToCombineJobData::newJS', newJS)
        
        // const newObj = Object.assign(...Object.entries(jobDetails).map(([key, job]) => {
        //     bug('loopToCombineJobData::job', job, key)
        //     bug('loopToCombineJobData::job.isMap()', job.isMap())

        //     const newValue = job;

        //     job.text = {
        //         city: job.getIn([ 'city', 'name', job.city ])
        //     }

        //     return {[key]: newValue}
        // }));

        // bug('loopToCombineJobData::newObj', newObj)

        // jobDetails.map((job) => combineJobData(job, ));
    }
}

const combineJobData = (state) => {
    bug('combineJobData::state', state)

    const cities = state.cities;
    const companies = state.companies;
    const loc_common = state.loc_common;

    const jobDetails = state.jobs.get('details');
    const jobLoc = state.jobs.get('loc');
    
    bug('combineJobData::cities', cities)
    bug('combineJobData::cities', cities.get('B'))

    bug('combineJobData::jobDetails', jobDetails)


};

const getJobsDetails = (state, props) => {
    // if (finishedLc(state))
    //     bug.rt('===>> selector fired state', state)
    // return state.jobs.get('details');
    if (finishedLc(state)) {
        // combineJobData(state);
        loopToCombineJobData(state);

        return state.jobs.get('details');
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