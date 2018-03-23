import React from 'react';
import '../../styles/rlist.css';
import styled from 'styled-components';
import { ListElem, SoftButton } from '../../styles/components';

import StateComponent from '../facc/StateComponent';

import bug from '../../../_libs/bug';


// const RListItem = ListElem.extend`
//     /* display: flex; */
//     &:hover {
//         background: aliceblue;
//     }
// `;

const RListItem = ListElem.extend`
    margin: 1px 5px;

    background: ${(props) => {
                                            /* bug('RListItem props', props)         */
        /* return props.active ?
            'red':
            'white' */
        return props.hovered ?
            '#eafbe9' :

            props.active ?
                '#f0e0fb':
                'white'
    }};
`;

const Left = styled.div`
    width: 40px;
    /* background: blanchedalmond; */
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
    /* background: azure; */
    display:flex;
`;

const MainLines = styled.div`
    color: #363738;
    display: flex;
`;

const ItemTitle = MainLines.extend`
    font-size: 1.25em;
`;

// const SoftButton = styled.button`
//     background: none;
//     border: none;
//     padding: 0;
// `;

const CompanyButton = SoftButton.extend`
    &:hover {
        color: #878a8a;
    }
`;

const JobTypeButton = CompanyButton.extend`
    line-height: 2em;
`;

// this as Component with modalType
const Item = ({job, resultId, onClickItem}) => (
    <StateComponent>
        {(elemState) => {
            return (

                <RListItem
                    onClick={onClickItem}
                    // active={elemState.active}
                    active={resultId === job.id}
                    hovered={elemState.hovered}
                >
                    <Left>
                    </Left>

                    <Main>
                        <ItemTitle>
                            {job.text.title}
                            &nbsp; &middot; &nbsp;
                            <JobTypeButton>
                                {job.text.type}
                            </JobTypeButton>
                        </ItemTitle>
                        <MainLines>
                            <CompanyButton>
                                {job.text.company}
                            </CompanyButton>
                                &nbsp; &middot; &nbsp;
                            <CompanyButton>
                                {job.text.city}
                            </CompanyButton>
                        </MainLines>
                    </Main>

                    <Right>
                    </Right>
                </RListItem>

            );
        }}

    </StateComponent>
        
);

export default Item;