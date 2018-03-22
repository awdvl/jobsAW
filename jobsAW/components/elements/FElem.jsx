import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FComp = styled.div`
    background: #8c0275;
    border: 1px solid white;
    padding: .5em;
    margin: 0 .5em;
    text-align: center;

    background: ${props => (
        props.hovered ?
            '#630353' :
            props.active ? 
                'white' : 
                'transparent'
    )};
`;

const FCompButton = SoftButton.extend`
    color: ${props => (props.active ? 
        props.hovered ?
            '#e0bdda' :
            '#96097f' : 
        'white'
    )};
    padding: .25em;
    border-radius: 3px;
`;

const dndStyle = {
    cursor: 'move'
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
                                                                    // bug('*** didDrop',didDrop)
        if (!didDrop) {
            const { moveFilter, filterOrder } = props;
            moveFilter (filterOrder, droppedId, originalIndex);
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
        const { id: overId, filterOrder, moveFilter } = props;

        if (draggedId !== overId) {
            const overIndex = props.findFilter (overId);
            moveFilter (filterOrder, draggedId, overIndex);
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
        moveFilter: PropTypes.func.isRequired,
        findFilter: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        hovered: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        setModalType: PropTypes.func.isRequired,        

    };

    render() {
        const { 
            connectDragSource, 
            connectDropTarget,
            isDragging,
            id,
            active,
            hovered,
            text, 
            setModalType
        } = this.props;
                                                                            // bug('FElem.jsx this.props', this.props)
        const opacity = isDragging ? 0 : 1;

        return compose (connectDragSource, connectDropTarget)(
            // div necessary, as "Only native element nodes can now be passed to React DnD connectors"
            <div>
                <FComp 
                    style={{
                        ...dndStyle,
                        opacity
                    }}
                    active={active}
                    hovered={hovered}
                    onClick={() => {setModalType(id)}}
                >
                    <FCompButton
                        active={active}
                        hovered={hovered}
                    >
                        {text}
                    </FCompButton>
                </FComp>
            </div>
        );

    }
}
