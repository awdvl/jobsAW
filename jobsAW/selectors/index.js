import { createSelector } from 'reselect';

const bug = console.log;


const getJobsDetails = state => {
    // bug('selector', state)
    return state.jobs.get('details');
}

export const getJobs = createSelector(
    getJobsDetails,

    (jobDetails) => {

        return jobDetails;
    }
);