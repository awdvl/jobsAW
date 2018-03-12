import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DropTarget } from 'react-dnd';
// import { DropTarget, DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import { findElemFor, moveElemFor } from '../../../_libs/dnd';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import FElem from './FElem';
import FModal from '../../containers/filterModal';
// import FModal from './FModal';

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

const FilterElems = (props) => {
    if (props.locFilter) {
        return props.filterOrder.map((elem) => {

            return (
                <FElem 
                    key={elem}
                    id={elem}
                    text={props.locFilter.get(elem)}
                    {...props}
                />
            );
        });
    }

    return <span>Loading...</span>;
};


const filterTarget = {
    drop (props, monitor, component) {
        // bug('*** drop  props, monitor, component', props, monitor, component)
        props.setIsMoving(false);
    }    
};



@DropTarget(ItemTypes.FILTER, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Filters extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        filterOrder: PropTypes.object.isRequired,
        loc: PropTypes.object.isRequired,
        updateOrder: PropTypes.func.isRequired,
        setIsMoving: PropTypes.func.isRequired,
        modalIsOpen: PropTypes.any.isRequired,
        modalType: PropTypes.string.isRequired,
        setModalType: PropTypes.func.isRequired,
    }

    render() {
                                                                    bug('*** Filters this.props', this.props)
        const { 
            connectDropTarget, 
            filterOrder, 
            loc, 
            updateOrder, 
            setIsMoving, 
            modalIsOpen,
            modalType,
            setModalType 
        } = this.props;
                                                                    bug('*** Filters modalIsOpen', modalIsOpen)

        return connectDropTarget(
            // div to transform into native componenet
            <div>
                <Wrapper>
                    <Header>
                        Filter
                    </Header>

                    {FilterElems({
                        locFilter: loc.filter,
                        moveFilter: moveElemFor (filterOrder, updateOrder, setIsMoving),
                        findFilter: findElemFor (filterOrder),
                        ...this.props
                    })}

                </Wrapper>

                <FModal/>

            </div>
        );
    }
}
