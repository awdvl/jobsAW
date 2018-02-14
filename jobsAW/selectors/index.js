import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

// const bug = console.log;


const getJobsDetails = (state, props) => {
    bug.rt('===>> selector fired state', state)
    return state.jobs.get('details');
}

export const getJobs = createSelector(
    getJobsDetails,

    (jobDetails) => {

        return jobDetails;
    }
);