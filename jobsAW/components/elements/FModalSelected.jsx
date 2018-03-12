import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import styled from 'styled-components';

import bug from '../../../_libs/bug';

const Section = styled.div`
    background: aliceblue;
    width: 100%;
    height: 100px;
`;

const filterTarget = {
    drop (props, monitor, component) {
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

        const { modalType } = this.props;

        return (
            <Section>

            </Section>
        );
    }
}