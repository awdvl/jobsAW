import React from 'react';
import styled from 'styled-components';

const ResultsListItem = styled.div`
    display: flex;
`;

const Item = ({job}) => (
    <ResultsListItem>
        {job.company}
    </ResultsListItem>
);

export default Item;