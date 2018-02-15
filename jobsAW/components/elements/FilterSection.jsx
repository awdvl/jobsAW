import React from 'react';
import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';

const Wrapper = styled.div`
    font-size: 1.5em;
    color: gray;
    /* background: darkseagreen; */
    padding: 1em 2.5em;
    display: flex;

`;

const Filter = styled.div`
    width: 5em;
    height: 1.25em;
    margin-right: 2em;
    background: white;
    /* float: left; */
`;

const FComp = styled.div`
    background: snow;
    padding: .5em;
    /* line-height: .75em; */
`;

const FCompButton = SoftButton.extend`
    padding: .25em;
    border-radius: 3px;

    &:hover {
        background: #d9e4e4;
    }
    /* &:focus {
        border-color: red;
    } */
`;

const clickFilterButton = (e) => {
    bug('button clicked!')
};

export default () => (
    <Wrapper>
        <Filter>
            Filter
        </Filter>
        <FComp>
            <FCompButton
                onClick={clickFilterButton}
            >
                City
            </FCompButton>
        </FComp>
    </Wrapper>
);