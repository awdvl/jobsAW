import React from 'react';
import '../../styles/rlist.css';
import styled from 'styled-components';
import { ListElem } from '../../styles/components';

// const RListItem = styled.div`
//     display: flex;
// `;
const RListItem = ListElem.extend`
    /* display: flex; */
`;

const Left = styled.div`
    width: 40px;
    background: blanchedalmond;
    display:flex;
`;

const Main = styled.div`
    flex: 1;
    /* background: papayawhip; */
    display: flex;
    flex-direction: column;
    padding: 0 .75em;
`;

const Right = styled.div`
    width: 60px;
    background: azure;
    display:flex;
`;

const MainLines = styled.div`
    display: flex;
`;

const ItemTitle = MainLines.extend`
    color: #363738;
    font-size: 1.5em;
`;

const SoftButton = styled.button`
    background: none;
    border: none;
    padding: 0;
`;

const CompanyButton = SoftButton.extend`
    color: red;
    padding-right: .5em;    
`;

const Item = ({job}) => (
    <RListItem>
        <Left>
        </Left>

        <Main>
            <ItemTitle>
                {job.text.title}
            </ItemTitle>
            <MainLines>
                <CompanyButton>
                    {job.text.company}
                </CompanyButton>
                <CompanyButton>
                    {job.text.city}
                </CompanyButton>
            </MainLines>
        </Main>

        <Right>
        </Right>
    </RListItem>
);

export default Item;