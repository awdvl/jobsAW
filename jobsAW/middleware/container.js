import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { fetchCities } from '../actions';
import JobsList from '../components/elements/JobsList'

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = dispatch => {
    return {
        getCities: () => dispatch(fetchCities())
    };
};

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

// export default withRouter(enhance(JobsList));
export default enhance(JobsList);