import { connect } from 'react-redux';
import { getFilterOrder } from '../reducers/filter';
import { updateOrder, setIsMoving } from '../actions/filter';
import filters from '../components/elements/FilterSection';

const mapStateToProps = state => ({
    filterOrder: getFilterOrder (state)
});
const mapDispatchToProps = dispatch => ({
    updateOrder: props => dispatch (updateOrder (props)),
    setIsMoving: isMoving => dispatch (setIsMoving (isMoving)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filters);
