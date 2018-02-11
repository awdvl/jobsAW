import { Map } from 'immutable';
import { FETCH_JOBS_SUCCESS } from '../constants';
import Jobs from '../records/Jobs';
import JobsDesc from '../records/JobsDesc';
import asMapRecord from '../utils/asMapRecord';

const bug = console.log;

const initState = Map({});

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            if (action.response) {
                bug('jobs.js action.response', action.response)
                const jobs = action.response.jobs;

                const jobsRecord = asMapRecord(Jobs, state, jobs);

                const jobsDesc = action.response.jobsDesc;
bug('jobDesc', jobsDesc, state)
                // const jobsDescRecord = jobsDesc.map((loc) => {
                //     bug('jobsDescRecord state', state)
                //     // return asMapRecord(JobsDesc, )
                // });
                
                // const jobsDescRecord = Object.assign(...Object.entries(jobsDesc).map(([k, v]) => ({[k]: asMapRecord(JobsDesc)v * v})));

                return jobsRecord;
                // return state;
            }

            return state;

        default:
            return state;
    }
};