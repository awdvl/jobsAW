import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 1.5em;
    color: gray;
    /* background: darkseagreen; */
    padding: 1em 2.5em;

`;

const Filter = styled.div`
    width: 5em;
    height: 1.25em;
    margin-right: 2em;
    background: white;
    /* float: left; */
`;


export default () => (
    <Wrapper>
        <Filter>
            Filter
        </Filter>
    </Wrapper>
);