import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { fetchCities, fetchCompanies, fetchLocCommon } from '../actions';
import * as actions from '../actions';
import JobsList from '../components/elements/JobsList'

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = dispatch => {
    return {
        // getCities: () => dispatch(fetchCities()),
        // getCompanies: () => dispatch(fetchCompanies()),
        // getLocCommon: () => dispatch(fetchLocCommon()),
        getCities: () => dispatch(actions.fetchCities()),
        getCompanies: () => dispatch(actions.fetchCompanies()),
        getLocCommon: () => dispatch(actions.fetchLocCommon()),
        getJobs: () => dispatch(actions.fetchJobs()),
    };
};

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

// export default withRouter(enhance(JobsList));
export default enhance(JobsList);