import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ItemTypes from '../../constants/itemTypes';
import { findElemFor, moveElemFor } from '../../../_libs/dnd';

import FMSElem from './FMSElem';
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
    // bug('SEcElems props', props)
    const {
        loc
    } = props;

    if (loc) {
        const type = 'city';
        const locForElem = loc[type].get('name')
                                                                                    // bug('locForElem', locForElem)
        return props.zoneFilterOrder.map((elem) => {

                                                                                    // bug('order elem', elem)
            return (
                <FMSElem 
                    key={elem}
                    id={elem}
                    text={locForElem.get(elem)}
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
        props.setIsMoving(false);
    }
};


@DropTarget(ItemTypes.FILTERZ, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class FModalSelected extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        modalType: PropTypes.string.isRequired,
        zoneFilterOrder: ImmutablePropTypes.list.isRequired,
        updateOrder: PropTypes.func.isRequired,
        // updateOrderFor: PropTypes.func.isRequired,
        setIsMoving: PropTypes.func.isRequired,
    }

    render() {
                                                                // bug('FModalSelected this.props', this.props)

        const {
            connectDropTarget,
            modalType,
            zoneFilterOrder,
            updateOrder,
            // updateOrderFor,
            setIsMoving,

        } = this.props;
                                                                        // bug('zoneFilterOrder', zoneFilterOrder)
        return connectDropTarget (
            <div>
                <Section>
                    {SecElems({
                        // locFilter: loc.filter,
                        // moveFilter: moveElemFor (zoneFilterOrder, updateOrder, setIsMoving),
                        // moveFilter: moveElemFor (zoneFilterOrder, updateOrderFor(modalType), {env: 'sel', setIsMoving}),
                        moveFilter: moveElemFor (zoneFilterOrder, updateOrder, {
                            env: 'sel', type: modalType, setIsMoving
                        }),
                        // moveFilter: moveElemFor (zoneFilterOrder, updateOrderFor(modalType), {env: 'sel'}),
                        findFilter: findElemFor (zoneFilterOrder),
                        ...this.props
                    })}
                </Section>
            </div>
        );
    }
}