import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FComp = styled.div`
    /* width: 100px; */
    background: #8c0275;
    border: 1px solid white;
    padding: .5em;
    margin: 0 .5em;
    text-align: center;
    /* line-height: .75em; */

    &:hover {
        background: #630353;
    }
`;

const FCompButton = SoftButton.extend`
    color: white;
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

// const clickFilterButton = (e) => {
//     bug('button clicked!')
// };



const makeFilterButton = ({text, setModalParams}) => {
    return (
        <FCompButton
            onClick={setModalParams}
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
                                                                    // bug('*** didDrop',didDrop)
        if (!didDrop) {
            // props.moveFilter (droppedId, originalIndex);
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
        // const { id: overId } = props;
        const { id: overId, filterOrder, moveFilter } = props;

        if (draggedId !== overId) {
            const overIndex = props.findFilter (overId);
            // props.moveFilter (draggedId, overIndex);
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
        text: PropTypes.string.isRequired,
        setModalType: PropTypes.func.isRequired,        

    };

    render() {
        const { 
            connectDragSource, 
            connectDropTarget,
            isDragging,
            id,
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
                >
                    {makeFilterButton ({
                        text, 
                        setModalParams: () => {
                            setModalType(id)
                        }
                    })}
                </FComp>
            </div>
        );

    }
}
