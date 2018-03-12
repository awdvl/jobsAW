import { connect } from 'react-redux';
import { getFilterOrder } from '../reducers/filter';
import { getModalIsOpen, getModalType } from '../reducers/ui';
import { updateOrder, setIsMoving } from '../actions/filter';
// import { setModalIsOpen, setModalType } from '../actions/ui';
import { setModalType } from '../actions/ui';
import filters from '../components/elements/FilterSection';

const mapStateToProps = state => ({
    filterOrder: getFilterOrder (state),
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
});
const mapDispatchToProps = dispatch => ({
    // updateOrder: props => dispatch (updateOrder (props)),
    // updateOrder: (filter, props) => dispatch (updateOrder (filter, props)),
    updateOrder: (...props) => dispatch (updateOrder (...props)),
    setIsMoving: isMoving => dispatch (setIsMoving (isMoving)),
    // setModalIsOpen: isOpen => dispatch (setModalIsOpen (isOpen)),
    setModalType: type => dispatch (setModalType (type)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filters);
