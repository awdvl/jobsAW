import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 1.5em;
    color: palevioletred;
    background: papayawhip;
    padding: 1em 2.5em;
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
        <Logo />
        jobsAW
    </Wrapper>
);