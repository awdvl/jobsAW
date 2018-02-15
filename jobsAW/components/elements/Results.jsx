import React from 'react';
import styled from 'styled-components';

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
`;

const Results = styled.div`
    background: rgba(0, 0, 0, .3);
    border: 1px solid #000000;

    flex: 1; /* same as flex: 1 1 auto; */
    
    /* Needed for when the area gets squished too far and there is content that can't be displayed */
    overflow: auto; 
`;

export default (props) => {
    bug.rt('Results.jsx props', props)

    return (
        <Wrapper>
            <RList {...props} />
            <Results>
                Hurz
            </Results>
        </Wrapper>
    );
}