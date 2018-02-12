import { connect } from 'react-redux';
import * as actions from '../actions';
import JobsList from '../components/elements/JobsList'

// --> ownProps comes from the props passed from the presentational component
// --> see: https://egghead.io/lessons/javascript-redux-filtering-redux-state-with-react-router-params
// --> here in the container apply the fitlered data logic and pass the props to the presentational components!
// const mapStateToProps = (state) => ({state: state});
const mapStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps)
    return {state: state};
    // return {
    //     state: state,
    //     ownProps,
    // };
};

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

const enhance = connect(
    mapStateToProps,
    // mapDispatchToProps
    actions
);

// export default withRouter(enhance(JobsList));
export default enhance(JobsList);