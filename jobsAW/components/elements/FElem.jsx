import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../constants/dnd';
import { DragSource } from 'react-dnd';

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

const elemSource = {
    beginDrag(props) {
        return {
            elemId: props.id
        }
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

@DragSource(ItemTypes.FILTER, elemSource, collect)
export default class FilterElem extends Component {
// class FilterElem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    render() {
                                                                    bug('FilterElem::this.props', this.props)
        // const { text } = this.props;
        const { text, connectDragSource, isDragging } = this.props;

        return connectDragSource(
            // div necessary, as "Only native element nodes can now be passed to React DnD connectors"
            <div>
                <FComp style={{
                    opacity: isDragging ? .5 : 1,
                    cursor: 'move'
                }}>
                    {makeFilterButton(text)}
                </FComp>
            </div>
        );

        // return (
        //     <FComp>
        //         {makeFilterButton(text)}
        //     </FComp>
        // );

    }
}

// FilterElem.propTypes = {
//     connectDragSource: PropTypes.func.isRequired,
//     isDragging: PropTypes.bool.isRequired
// };


// export default DragSource(ItemTypes.FILTER, elemSource, collect)(FilterElem);
// export default FilterElem;