import React from 'react';
import '../../styles/rlist.css';
import styled from 'styled-components';

import bug from '../../../_libs/bug';

import RListItems from './RListItems';


// export default RList;
export default  (props) => {
    bug('RList.jsx props', props)
    // alert('props', props)
    // bug('props.jobs', props.jobs, props.cities, props.allLoaded)

    const heading = 'Front-end Engineer';
    const numberOfJobs = '12';
    
    const ListWrapper = styled.div`
        background: white;
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        width: 500px;
    `;

    const RListHeader = styled.div`
        color: #363738;

        border-bottom: 1px solid grey;
        display: flex;
    `;

    const HeaderHeading = styled.h3`
        font-size: 1.75em;
        margin: .75em 0;
        flex: 1;
    `;

    const HeaderJobNumers = styled.span`
        color: #9994a2;
        font-size: 1.75em;
        font-weight: bold;
        width: 60px;
        line-height: 2.75em;
        text-align: right;
    `;

    const RListItemsWrapper = styled.ul`
        display: flex;
        flex-direction: column;
    `;



    const LoadedList = ({jobs}) => (
        <div>
            <RListHeader className='listElemW'>
                <HeaderHeading>
                    {heading}
                </HeaderHeading>
                <HeaderJobNumers>
                    {numberOfJobs}
                </HeaderJobNumers>
            </RListHeader>   
            <RListItemsWrapper className='listElemW'>
                {/* {bug('inside props.jobs', props.get('jobs'))} */}
                {bug('inside props.state.jobs', jobs)}
                {jobs.map((job) => (
                    <RListItems key={job.id}
                        job={job}
                    />
                ))}
            </RListItemsWrapper>
        </div>
    );
    

    const List = () => (props.allLoaded ?
            <LoadedList jobs={props.jobs} /> :
            <p>Loading...</p>);
    
    return (
        <ListWrapper >
            <List />
        </ListWrapper >
    );

    // return <ListWrapper />;
};