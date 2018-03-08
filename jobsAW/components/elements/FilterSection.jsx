import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../constants/filter';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import R from 'ramda';

import FElem from './FElem';

import bug from '../../../_libs/bug';

const Wrapper = styled.div`
    font-size: 1.5em;
    color: gray;
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


const FilterElems = (
    filterOrder,
    loc,
    moveFilter,
    findFilter,

) => {
    // bug('filterProps', filterProps)
    // const __order = state.__order
    // bug('__order', __order)
    // bug('loc', loc)

    if (loc) {
        return filterOrder.map((elem) => {
            // bug('orderedElem', elem, loc.get(elem))
            // const text = loc.get(elem);

            return (
                <FElem 
                    key={elem}
                    id={elem}
                    text={loc.get(elem)}
                    moveFilter={moveFilter}
                    findFilter={findFilter}
                />

            );

        });

    }

    return <span>Loading...</span>;
};



// const findFilterIndex = R.curry ((filterOrder) => (filter) => filterOrder.findIndex(value => value === filter));
const findFilterIndex = (filterOrder) => (filter) => filterOrder.findIndex(value => value === filter);

const moveFilter = (filterOrder, onUpdateOrder) => (filter, atIndex) => {
        const index = findFilterIndex(filterOrder)(filter);

        onUpdateOrder({
            filter,
            index,
            atIndex
        });

    }


const filterTarget = {
    drop() {},
};



@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.FILTER, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Filters extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
    }

    // constructor (props) {
    //     super(props);
    //     this.moveFilter = this.moveFilter.bind(this);
    // }


    // moveFilter(filterOrder, onUpdateOrder) {
    //     return (filter, atIndex) => {
    //         const index = this.findFilterIndex(filterOrder)(filter);

    //         onUpdateOrder({
    //             filter,
    //             index,
    //             atIndex
    //         });

    //     }
    // }

    // findFilterIndex(filterOrder) {
    //     return (filter) => {
    //                                                 // bug('findFilterIndex', __order.findIndex(value => value === filter))
    //         return filterOrder.findIndex(value => value === filter);
    //     }
    // }

    render() {
                                                                    bug('*** Filters this.props', this.props)
        // const { connectDropTarget, state, loc, onUpdateOrder } = this.props;
        // const { connectDropTarget, state, loc, updateOrder } = this.props;
        // const filterOrder = state.ui.filter.__order;
        const { connectDropTarget, filterOrder, loc, updateOrder } = this.props;

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
                        // this.moveFilter(state, onUpdateOrder),
                        // this.moveFilter(filterOrder, updateOrder),
                        moveFilter(filterOrder, updateOrder),
                        // this.findFilterIndex(filterOrder)
                        findFilterIndex(filterOrder)
                    )}

                </Wrapper>
            </div>
        );
    }
}
