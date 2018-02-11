import { Map, fromJS } from 'immutable';
import { FETCH_JOBS_SUCCESS } from '../constants';
import Jobs from '../records/Jobs';
import JobsDesc from '../records/JobsDesc';
import asMapRecord from '../utils/asMapRecord';

const bug = console.log;

const asDeepMapRecord = (recordClass, state, data) => {
    // first level a Map (key is an empty string), second a Record
    const reviver = (key, value) => {
        return key.length > 3   ?
            recordClass(value):
            Map(value);
    };

    return state.mergeDeep(fromJS(data, reviver));
};

// const initState = Map({});
// const initState = Map({jobs:{}, jobsDesc:{}});
const initState = fromJS({jobs:{}, jobsDesc:{}});

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            if (action.response) {
                bug('jobs.js action.response', action.response)
                const jobs = action.response.jobs;

                const stateJobs = state.get('jobs');
// bug('stateJobs', state, stateJobs)

                // const jobsRecord = asMapRecord(Jobs, state, jobs);
                const jobsRecord = asMapRecord(Jobs, stateJobs, jobs);
                // const newState = state.set('jobs', jobsRecord);
// bug('newState', newState)
// bug('jobDesc', jobsDesc, state)

                const jobsDesc = action.response.jobsDesc;
                const stateJobsDesc = state.get('jobsDesc');
                const jobsDescRecord = asDeepMapRecord(JobsDesc, stateJobsDesc, jobsDesc);

bug('jobDesc', jobsDesc, jobsDescRecord)

                const newState = state.merge({
                    jobs: jobsRecord,
                    jobsDesc: jobsDescRecord
                })

                
                // const jobsDescRecord = jobsDesc.map((loc) => {
                //     bug('jobsDescRecord state', state)
                //     // return asMapRecord(JobsDesc, )
                // });
                
                // const jobsDescRecord = Object.assign(...Object.entries(jobsDesc).map(([k, v]) => ({[k]: asMapRecord(JobsDesc)v * v})));

                return newState;
                // return jobsRecord;
                // return state;
            }

            return state;

        default:
            return state;
    }
};