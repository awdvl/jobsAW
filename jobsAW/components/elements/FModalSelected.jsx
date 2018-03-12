import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';

import FMSElem from './FMSElem';

import { findElemFor, moveElemFor } from '../../../_libs/dnd';

import styled from 'styled-components';

import bug from '../../../_libs/bug';

const Section = styled.div`
    background: #e1e8d6; 
    width: 100%;
    /* height: 100px; */
    min-height: 86px;
    padding: 1.5em;
    display: flex;
`;


const SecElems = (props) => {
    bug('SEcElems props', props)
    const {
        loc
    } = props;

    if (loc) {
        const type = 'city';
        const locForElem = loc[type].get('name')
                                                                                    bug('locForElem', locForElem)
        return props.zoneFilterOrder.map((elem) => {

                                                                                    bug('order elem', elem)
            return (
                <FMSElem 
                    key={elem}
                    id={elem}
                    text={locForElem.get(elem)}
                    // text={elem}
                    {...props}
                />
            );
        });
    }

    return <span>Loading...</span>;
};

const filterTarget = {
    drop(props, monitor, component) {
        // bug('*** drop  props, monitor, component', props, monitor, component)
        // props.setIsMoving(false);
    }
};


@DropTarget(ItemTypes.FILTER1, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class FModalSelected extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        modalType: PropTypes.string.isRequired
    }

    render() {
                                                                bug('FModalSelected this.props', this.props)

        const {
            connectDropTarget,
            modalType,
            zoneFilterOrder
        } = this.props;

        const updateOrder = () => {};
        const setIsMoving = () => {};

        return connectDropTarget(
            <div>
                <Section>
                    {SecElems({
                        // locFilter: loc.filter,
                        moveFilter: moveElemFor (zoneFilterOrder, updateOrder, setIsMoving),
                        findFilter: findElemFor (zoneFilterOrder),
                        ...this.props
                    })}
                </Section>
            </div>
        );
    }
}