import { connect } from 'react-redux';
import { getLoc } from '../selectors';
import { 
    getFilterZoneFor, 
    getMovingFromZone,
    getFilterOnlyTop 
} from '../reducers/filter';

import { getModalIsOpen, getModalType } from '../reducers/ui';
import { 
    updateFilter, 
    setIsMoving,
    setIsMovingFromZone,
    toggleOnlyTop
} from '../actions/filter';

import { closeModal } from '../actions/ui';

import filterModal from '../components/elements/FModal';

const mapStateToProps = (state, ownProps) => ({
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
    getFilterZone: getFilterZoneFor (state),
    onlyTop: getFilterOnlyTop (state),
    movedFromZone: getMovingFromZone (state),
    loc: getLoc (state),

});
const mapDispatchToProps = (dispatch, ownProps) => ({
    setIsMoving: (isMoving) => dispatch (setIsMoving (isMoving)),
    setIsMovingFromZone: (fromZone) => dispatch (setIsMovingFromZone (fromZone)),
    closeModal: () => dispatch (closeModal ()),
    updateFilter: (...props) => dispatch (updateFilter (...props)),
    toggleOnlyTop: (type, payload) => dispatch (toggleOnlyTop (type, payload)),
});

const enhance = connect (
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filterModal);