import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DragSource, DropTarget } from 'react-dnd';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FComp = styled.div`
    width: 100px;
    background: snow;
    border: 1px dotted firebrick;
    padding: .5em;
    margin: 0 .5em;
    text-align: center;
    /* line-height: .75em; */

    &:hover {
        background: #d9e4e4;
    }
`;

const FCompButton = SoftButton.extend`
    padding: .25em;
    border-radius: 3px;

    /* &:hover {
        background: #d9e4e4;
    } */
    /* &:focus {
        border-color: red;
    } */
`;

const dndStyle = {
    cursor: 'move'
};

const clickFilterButton = (e) => {
    bug('button clicked!')
};


const makeFilterButton = (text, setModalIsOpen) => {
    return (
        <FCompButton
            // onClick={clickFilterButton}
            onClick={() => setModalIsOpen(true)}
        >
            {text}
        </FCompButton>
    );

};

const filterSource = {
    beginDrag (props) {
                                                        // bug('*** beginDrag props', props)
        props.setIsMoving(true);

        return {
            id: props.id,
            originalIndex: props.findFilter (props.id),
        };
    },

    endDrag (props, monitor) {
                                                                    // bug('*** endDrag item-props', monitor.getItem())
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop ();

        if (!didDrop) {
            props.moveFilter (droppedId, originalIndex);
        }
    }
};

const filterTarget = {
    canDrop () {
        return false;
    },

    hover (props, monitor) {
                                                                // bug('*** hover item-props', monitor.getItem(), props)
        const { id: draggedId } = monitor.getItem ();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const overIndex = props.findFilter (overId);
            props.moveFilter (draggedId, overIndex);
        }
    },
};



@DropTarget(ItemTypes.FILTER, filterTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.FILTER, filterSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class FilterElem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveFilter: PropTypes.func.isRequired,
        findFilter: PropTypes.func.isRequired,
        setModalIsOpen: PropTypes.func.isRequired,
    };

    render() {
        const { 
            text, 
            isDragging,
            connectDragSource, 
            connectDropTarget,
            setModalIsOpen,
        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            connectDropTarget(
                // div necessary, as "Only native element nodes can now be passed to React DnD connectors"
                <div>
                    <FComp 
                        style={{
                            ...dndStyle,
                            opacity
                        }}
                    >
                        {makeFilterButton(text, setModalIsOpen)}
                    </FComp>
                </div>
            )
        );

    }
}
