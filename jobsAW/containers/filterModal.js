import { connect } from 'react-redux';
import { getLoc } from '../selectors';
import { getFilterZoneFor, getMovingFromZone } from '../reducers/filter';
import { getModalIsOpen, getModalType } from '../reducers/ui';
import { 
    updateFilter, 
    setIsMoving,
    setIsMovingFromZone
} from '../actions/filter';

import { closeModal } from '../actions/ui';

import filterModal from '../components/elements/FModal';

const mapStateToProps = (state) => ({
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
    getFilterZone: getFilterZoneFor (state),
    movedFromZone: getMovingFromZone (state),
    loc: getLoc (state),

});
const mapDispatchToProps = (dispatch, ownProps) => ({
    setIsMoving: (isMoving) => dispatch (setIsMoving (isMoving)),
    setIsMovingFromZone: (fromZone) => dispatch (setIsMovingFromZone (fromZone)),
    closeModal: () => dispatch (closeModal ()),
    updateFilter: (...props) => dispatch (updateFilter (...props)),
});

const enhance = connect (
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filterModal);