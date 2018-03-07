import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../../constants/dnd';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

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
    state,
    loc,
    moveFilter,
    findFilter,

) => {
    // bug('filterProps', filterProps)
    const __order = state.__order
    // bug('__order', __order)
    // bug('loc', loc)

    if (loc) {
        return __order.map((elem) => {
            // bug('orderedElem', elem, loc.get(elem))
            const text = loc.get(elem);

            return (
                <FElem 
                    key={elem}
                    id={elem}
                    text={text}
                    moveFilter={moveFilter}
                    findFilter={findFilter}
                />

            );

        });

    }

    return <span>Loading...</span>;
};

const filterTarget = {
    drop() {},
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
});


@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.FILTER, filterTarget, collect)
export default class Filters extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
    }

    constructor (props) {
        super(props);
        this.moveFilter = this.moveFilter.bind(this);
    }


    moveFilter(state, onUpdateOrder) {
        return (id, atIndex) => {
            // const { filter, index } = this.findFilter(state)(id);
            // const { index } = this.findFilter(state)(id);
            const index = this.findFilterIndex(state)(id);

            onUpdateOrder({
                filter: id,
                index,
                atIndex
            });

        }
    }

    findFilterIndex(state) {
        const __order = state.ui.filter.__order;

        return (filter) => {
                                                    // bug('findFilterIndex', __order.findIndex(value => value === filter))
            return __order.findIndex(value => value === filter);
        }
    }
    // findFilter(state) {
    //     const __order = state.ui.filter.__order;

    //     return (filter) => {
    //                                                 // bug('findFilterIndex', __order.findIndex(value => value === filter))
    //         return {
    //             filter,
    //             index: __order.findIndex(value => value === filter),
    //         };
    //     }
    // }

    render() {
                                                                    bug('Filters this.props', this.props)
        const { connectDropTarget, state, loc, onUpdateOrder } = this.props;

        return connectDropTarget(
            // div to transform into native componenet
            <div>
                <Wrapper>
                    <Header>
                        Filter
                    </Header>

                    {FilterElems(
                        state.ui.filter, 
                        loc.filter,
                        this.moveFilter(state, onUpdateOrder),
                        // this.findFilter(state)
                        this.findFilterIndex(state)
                    )}

                </Wrapper>
            </div>
        );
    }
}
