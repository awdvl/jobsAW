import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../constants/filter';
import { DragSource, DropTarget } from 'react-dnd';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FComp = styled.div`
    background: snow;
    padding: .5em;
    /* line-height: .75em; */
`;

const FCompButton = SoftButton.extend`
    padding: .25em;
    border-radius: 3px;

    &:hover {
        background: #d9e4e4;
    }
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


const makeFilterButton = (text) => {
    return (
        <FCompButton
            onClick={clickFilterButton}
        >
            {text}
        </FCompButton>
    );

};

const filterSource = {
    beginDrag (props) {
        return {
            id: props.id,
            originalIndex: props.findFilter (props.id),
        };
    },

    endDrag (props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop ();

        if (!didDrop) {
            // props.moveFilter (droppedId, originalIndex);
            props.moveFilter (droppedId, originalIndex, true);

        // } else {
        //     return
        }
    }
};

const filterTarget = {
    canDrop () {
        return false;
    },

    hover (props, monitor) {
        const { id: draggedId } = monitor.getItem ();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const overIndex = props.findFilter (overId);
            // props.moveFilter (draggedId, overIndex);
            props.moveFilter (draggedId, overIndex, true);
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
        // updateOrder: PropTypes.func.isRequired
    };

    render() {
        const { 
            text, 
            isDragging,
            connectDragSource, 
            connectDropTarget,
        } = this.props;

        const opacity = isDragging ? .5 : 1;

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
                        {makeFilterButton(text)}
                    </FComp>
                </div>
            )
        );

    }
}
