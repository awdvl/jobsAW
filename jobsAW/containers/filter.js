import { connect } from 'react-redux';
import { updateOrder } from '../actions/filter';
import filters from '../components/elements/FilterSection';

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
    onUpdateOrder: order => dispatch(updateOrder(order)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance(filters);