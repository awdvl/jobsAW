import { connect } from 'react-redux';
import { getLoc } from '../selectors';
import { getFilterZoneFor, getMovingFromZone } from '../reducers/filter';
import { getModalIsOpen, getModalType } from '../reducers/ui';
import { 
    updateOrder, 
    setIsMoving,
    setMovingFromZone
} from '../actions/filter';

import { closeModal } from '../actions/ui';
import { findElemFor, moveElemFor2 } from '../../_libs/dnd';

import filterModal from '../components/elements/FModal';

const mapStateToProps = (state) => ({
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
    getFilterZone: getFilterZoneFor (state),
    movedFromZone: getMovingFromZone (state),
    loc: getLoc (state),

});
const mapDispatchToProps = (dispatch, ownProps) => ({
    setIsMoving: isMoving => dispatch (setIsMoving (isMoving)),
    setMovingFromZone: fromZone => dispatch (setMovingFromZone (fromZone)),
    closeModal: () => dispatch (closeModal ()),
    updateOrder: (...props) => dispatch (updateOrder (...props)),
    // findElemFor: (...props) => dispatch (findElemFor(...props)),
    // moveElemFor2: (...props) => dispatch (moveElemFor2(...props)),

    // moveFilter: (...props) => moveElemFor2 (ownProps.updateOrder, {
    //     type: ownProps.modalType, 
    //     setIsMoving: ownProps.setIsMoving, 
    //     setMovingFromZone: ownProps.setMovingFromZone
    // }),
});

const enhance = connect (
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filterModal);