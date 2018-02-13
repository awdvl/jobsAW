import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 1.5em;
    color: grey;
    font-style: italic;
    background: white;
    border-bottom: 1px solid saddlebrown;
    padding: .75em 3em;
`;

const Logo = styled.div`
    width: 5em;
    height: 1.25em;
    margin-right: 2em;
    background: grey;
    float: left;
`;


export default () => (
    <Wrapper>
        {/* <Logo /> */}
        BlueJobs
    </Wrapper>
);