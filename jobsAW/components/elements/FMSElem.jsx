import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FMSECompButton = SoftButton.extend`
    width: 120px;
    background: snow;
    box-shadow: 0 0 0 0.5px #424e3d;
    margin: .5em;
    /* padding-left: .5em; */
    padding-left: 1em;
    text-align: left;
    line-height: 36px;

    &:hover {
        background: #d9e4e4;
    }

`;

const ButtonText = styled.span`
    height: 36px;
`;

const ButtonClose = styled.div`
    color: #9dd0c6;
    width: 36px;
    height: 36px;
    background: transparent;
    text-align: center;
    float: right;

    color: #9dd0c6;
    &:after {
        content: '\00D7';
        font-size: 2em;
    }

    &:hover {
        color: #f35d5d;
        cursor: pointer;
    }
`;



const dndStyle = {
    cursor: 'move'
};

// const clickFilterButton = (e) => {
//     bug('button clicked!')
// };


const makeFilterButton = ({ text }) => {
    return (
        <div>
            <ButtonText
            // on click in all: move to next section (up)
            // onClick={setModalParams}
            >
                {text}
            </ButtonText>

            <ButtonClose 
                onClick={() => {bug('Exclude item')}}
            />
        </div>
    );

};

const filterSource = {
    beginDrag(props) {
        // bug('*** beginDrag props', props)
        // props.setIsMoving(true);

        return {
            id: props.id,
            originalIndex: props.findFilter(props.id),
        };
    },

    endDrag(props, monitor) {
        bug('*** endDrag item-props', monitor.getItem())
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop ();

        if (!didDrop) {
            props.moveFilter (droppedId, originalIndex);
        }
    }
};

const filterTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        // bug('*** hover item-props', monitor.getItem(), props)
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const overIndex = props.findFilter(overId);
            props.moveFilter(draggedId, overIndex);
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
export default class FilterZoneElem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        moveFilter: PropTypes.func.isRequired,
        findFilter: PropTypes.func.isRequired,
        //     setModalType: PropTypes.func.isRequired,        

    };

    render() {
        const {
            text,
            id,
            isDragging,
            connectDragSource,
            connectDropTarget,
            // setModalType
        } = this.props;
        // bug('FElem.jsx this.props', this.props)
        const opacity = isDragging ? 0 : 1;

        return compose(connectDragSource, connectDropTarget)(
            // return (
            // div necessary, as "Only native element nodes can now be passed to React DnD connectors"
            <div>
                <FMSECompButton
                    style={{
                        ...dndStyle,
                        opacity
                    }}
                >
                    {makeFilterButton({
                        text
                        // setModalParams: () => {
                        //     setModalType(id)
                        // }
                    })}
                </FMSECompButton>
            </div>
        );

    }
}
