import { connect } from 'react-redux';

import { getJobData, getLoc, getSelectableFilters } from '../selectors';
import * as actions from '../actions/fetch';

import { getFilterIsMoving } from '../reducers/filter';
import { getModalIsOpen } from '../reducers/ui';
import { getSelectablesLoadedFlag } from '../reducers'; 

import App from '../components/elements/App';

const mapStateToProps = (state, ownProps) => ({
    loaded: actions.getLoadingFinished (state),
    jobs: getJobData (state),
    loc: getLoc (state),
    selectableFilters: getSelectableFilters (state),
    selectablesLoadedFlag: getSelectablesLoadedFlag (state),
    modalIsOpen: getModalIsOpen (state),
    filterIsMoving: getFilterIsMoving (state),
});

// const mapDispatchToProps = dispatch => {
//     return {
//         // getCities: () => dispatch(actions.fetchCities()),
//         // getCompanies: () => dispatch(actions.fetchCompanies()),
//         // getLocCommon: () => dispatch(actions.fetchLocCommon()),
//         // getJobs: () => dispatch(actions.fetchJobs()),
//         fetchCities: () => dispatch(actions.fetchCities()),
//         fetchCompanies: () => dispatch(actions.fetchCompanies()),
//         fetchLocCommon: () => dispatch(actions.fetchLocCommon()),
//         fetchJobs: () => dispatch(actions.fetchJobs()),
//     };
// };


const enhance = connect (
    mapStateToProps,
    // mapDispatchToProps
    actions
);

// export default withRouter(enhance(JobsList));
export default enhance (App);