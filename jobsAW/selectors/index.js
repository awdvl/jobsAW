import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

import { finishedLc } from '../utils/loadCtrl';

// const bug = console.log;


const getJobsDetails = (state, props) => {
    // if (finishedLc(state))
    //     bug.rt('===>> selector fired state', state)
    // return state.jobs.get('details');
    if (finishedLc(state)) {
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