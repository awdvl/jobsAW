import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../constants/filter';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

// import { is } from 'immutable';
// import R from 'ramda';

import FElem from './FElem';
import FModal from './FModal';

import bug from '../../../_libs/bug';


const Wrapper = styled.div`
    font-size: 1.5em;
    color: gray;
    background: seagreen;
    padding: 1em 2.5em;
    width: 100%;
    position: fixed;
    margin-top: 58.5px;
    background: wheat;

    display: flex;

`;

const Header = styled.div`
    width: 5em;
    height: 1.25em;
    margin-right: 2em;
    background: white;
    /* float: left; */
`;

// ->> this better as props?? in {}
const FilterElems = (
    filterOrder,
    loc,
    moveFilter,
    findFilter,
    setIsMoving,
    setModalIsOpen,

) => {
    if (loc) {
        return filterOrder.map((elem) => {

            return (
                <FElem 
                    key={elem}
                    id={elem}
                    text={loc.get(elem)}
                    moveFilter={moveFilter}
                    findFilter={findFilter}
                    setIsMoving={setIsMoving}
                    setModalIsOpen={setModalIsOpen}
                    // {...props}
                />
            );
        });
    }

    return <span>Loading...</span>;
};



// const findFilterIndex = R.curry ((filterOrder) => (filter) => filterOrder.findIndex(value => value === filter));
const findFilterIndex = (filterOrder) => (filter) => filterOrder.findIndex(value => value === filter);

const moveFilter = ({filterOrder, updateOrder, setIsMoving}) => (filter, atIndex) => {
    const index = findFilterIndex(filterOrder)(filter);
                            // bug('*** filterOrder, filter, index, atIndex', filterOrder, filter, index, atIndex)
    updateOrder({
        filter,
        index,
        atIndex,
    });

    setIsMoving(true);
};

const filterTarget = {
    drop (props, monitor, component) {
        // bug('*** drop  props, monitor, component', props, monitor, component)
        props.setIsMoving(false);
    }    
};



@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.FILTER, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Filters extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        updateOrder: PropTypes.func.isRequired,
        setIsMoving: PropTypes.func.isRequired,
        filterOrder: PropTypes.object.isRequired,
        loc: PropTypes.object.isRequired,
        setModalIsOpen: PropTypes.func.isRequired,
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //                                                             // bug('***', this.props, nextProps, nextState)
    //     const notUpdated = is (this.props.filterOrder, nextProps.filterOrder)

    //     // bug('*** filterOrder updated', this.props.filterOrder.get(0), nextProps.filterOrder.get(0), !notUpdated)
    //     bug('*** filterOrder updated', this.props.filterOrder.toJSON(), nextProps.filterOrder.toJSON(), !notUpdated)

    //     if (!notUpdated) {
    //         bug('*** UPDATE in FILTER');
    //     }

    //     return true;
    // }

    render() {
                                                                    // bug('*** Filters this.props', this.props)
        const { connectDropTarget, filterOrder, loc, 
            updateOrder, 
            setIsMoving, 
            modalIsOpen,
            setModalIsOpen } = this.props;
                                                                    bug('*** Filters modalIsOpen', modalIsOpen)

        return connectDropTarget(
            // div to transform into native componenet
            <div>
                <Wrapper>
                    <Header>
                        Filter
                    </Header>

                    {FilterElems(
                        filterOrder, 
                        loc.filter,
                        moveFilter({filterOrder, updateOrder, setIsMoving}),
                        findFilterIndex(filterOrder),
                        setIsMoving,
                        setModalIsOpen,
                    )}

                </Wrapper>
                <FModal
                    modalIsOpen={modalIsOpen}
                >

                </FModal>
            </div>
        );
    }
}
