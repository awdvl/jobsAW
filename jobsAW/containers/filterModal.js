import { connect } from 'react-redux';
import { getLoc } from '../selectors';
import { getFilterZoneFor } from '../reducers/filter';
import { getModalIsOpen, getModalType } from '../reducers/ui';
import { updateOrder, setIsMoving } from '../actions/filter';
import { closeModal } from '../actions/ui';
import filterModal from '../components/elements/FModal';

const mapStateToProps = state => ({
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
    getFilterZone: getFilterZoneFor (state),
    loc: getLoc (state),

});
const mapDispatchToProps = dispatch => ({
    setIsMoving: isMoving => dispatch (setIsMoving (isMoving)),
    closeModal: () => dispatch (closeModal ()),
    updateOrder: (...props) => dispatch (updateOrder (...props)),
});

const enhance = connect (
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filterModal);