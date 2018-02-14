import React from 'react';
import styled from 'styled-components';

const bug = console.log;

// export default ResultsList;
export default  (props) => {
    bug('ResultsList.jsx props', props)
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

    const ResultsListHeader = styled.div`
        padding: 0 1.25em;
        border-bottom: 1px solid grey;
        display: flex;
    `;

    const HeaderHeading = styled.h3`
        flex: 1;
    `;

    const HeaderJobNumers = styled.span`
        width: 60px;
        line-height: 3.75em;
        text-align: right;
        background: aliceblue;
    `;

    const ResultsListItemsWrapper = styled.ul`
        display: flex;
        flex-direction: column;
    `;



    const LoadedList = () => (
        <div>
            <ResultsListHeader>
                <HeaderHeading>
                    {heading}
                </HeaderHeading>
                <HeaderJobNumers>
                    {numberOfJobs}
                </HeaderJobNumers>
            </ResultsListHeader>   
            <ResultsListItemsWrapper>
                {bug('inside props.jobs', props.jobs)}
            </ResultsListItemsWrapper>
        </div>
    );
    

    // const List = () => (props.allLoaded() ?
    const List = () => (props.allLoaded ?
            // <div>Loaded</div> :
            <LoadedList /> :
            <p>Loading...</p>);
    
    return (
        <ListWrapper >
            <List />
        </ListWrapper >
    );

    // return <ListWrapper />;
};