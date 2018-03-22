import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 1em;
    color: grey;
    background: white;
    padding: .5em 2.5em;

    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #710b60;    
`;

export default () => (
    <Wrapper>
        BlueJobs
    </Wrapper>
);