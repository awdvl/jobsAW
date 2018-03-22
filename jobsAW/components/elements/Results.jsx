import React, { Component } from 'react';
import styled from 'styled-components';
import { getFilterIsMoving } from '../../reducers/filter';
import { getModalIsOpen } from '../../reducers/ui';

import bug from '../../../_libs/bug';

import RList from './RList';

const Wrapper = styled.div`
    background: aliceblue;
    flex: 1; /* same as flex: 1 1 auto; */

    display: flex;
    flex-direction: row;
    
    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */    

    margin-top: 148.5px;
    margin-bottom: 31px;
`;

const RDetails = styled.div`
    background: rgba(0, 0, 0, .3);
    border: 1px solid #000000;

    /* same as flex: 1 1 auto; */
     /* flex: 1; */

    /* Needed for when the area gets squished too far and there is content that can't be displayed */
    /* overflow: auto;  */

    position: fixed;
    top: 148.5px;
    right: 0;
    width: calc(100% - 411px);
    bottom: 31px;
`;

export default class Results extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.modalIsOpen && !nextProps.filterIsMoving;
    }

    render() {
        return (
            <div>
                <Wrapper>
                    <RList {...this.props} />
                    {/* <RDetails>
                    Hurz
                </RDetails> */}
                </Wrapper>
                <RDetails>
                    Hurz
                </RDetails>
            </div>
        );
    }
}
