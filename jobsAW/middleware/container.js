import { connect } from 'react-redux';
import { fetchCities } from '../actions';

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

export default enhance();