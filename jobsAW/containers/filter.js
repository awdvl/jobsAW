import { connect } from 'react-redux';
import { getFilterOrder } from '../reducers/filter';
import { getModalIsOpen, getModalType } from '../reducers/ui';
import { updateFilter, setIsMoving } from '../actions/filter';
import { setModalType } from '../actions/ui';
import filters from '../components/elements/FilterSection';

const mapStateToProps = (state) => ({
    filterOrder: getFilterOrder (state),
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
});
const mapDispatchToProps = (dispatch) => ({
    updateFilter: (...props) => dispatch (updateFilter (...props)),
    setIsMoving: (isMoving) => dispatch (setIsMoving (isMoving)),
    setModalType: (type) => dispatch (setModalType (type)),
});

const enhance = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filters);
