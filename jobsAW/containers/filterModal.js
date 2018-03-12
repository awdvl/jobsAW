import { connect } from 'react-redux';
import { getLoc } from '../selectors';
import { getFilterZoneFor } from '../reducers/filter';
import { getModalIsOpen, getModalType } from '../reducers/ui';
// import { updateOrder, setIsMoving } from '../actions/filter';
// import { setModalIsOpen, setModalType } from '../actions/ui';
// import { setModalIsOpen, closeModal } from '../actions/ui';
import { closeModal } from '../actions/ui';
import filterModal from '../components/elements/FModal';

const mapStateToProps = state => ({
    // filterOrder: getFilterOrder (state),
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
    getFilterZone: getFilterZoneFor (state),
    loc: getLoc (state),

});
const mapDispatchToProps = dispatch => ({
    // updateOrder: props => dispatch (updateOrder (props)),
    // setIsMoving: isMoving => dispatch (setIsMoving (isMoving)),
    // setModalIsOpen: isOpen => dispatch (setModalIsOpen (isOpen)),
    closeModal: () => dispatch (closeModal()),
    // setModalType: type => dispatch (setModalType (type)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filterModal);