import { connect } from 'react-redux';
import { getFilterOrder } from '../reducers/filter';
import { getModalIsOpen } from '../reducers/ui';
import { updateOrder, setIsMoving } from '../actions/filter';
import { setModalIsOpen } from '../actions/ui';
import filters from '../components/elements/FilterSection';

const mapStateToProps = state => ({
    filterOrder: getFilterOrder (state),
    modalIsOpen: getModalIsOpen (state),
});
const mapDispatchToProps = dispatch => ({
    updateOrder: props => dispatch (updateOrder (props)),
    setIsMoving: isMoving => dispatch (setIsMoving (isMoving)),
    setModalIsOpen: isOpen => dispatch (setModalIsOpen (isOpen)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filters);
