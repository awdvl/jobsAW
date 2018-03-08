import { connect } from 'react-redux';
import { selectFilterOrder } from '../selectors/filter';
import { updateOrder } from '../actions/filter';
import filters from '../components/elements/FilterSection';

// const mapStateToProps = state => ({state});
const mapStateToProps = state => ({
    filterOrder: selectFilterOrder (state)
});
const mapDispatchToProps = dispatch => ({
    updateOrder: order => dispatch (updateOrder (order)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filters);

// @connect(mapStateToProps, mapDispatchToProps)
// export default filters;