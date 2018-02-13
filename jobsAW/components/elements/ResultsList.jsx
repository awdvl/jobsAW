import React from 'react';
import styled from 'styled-components';

const bug = console.log;

// export default ResultsList;
export default  (props) => {
    bug('ResultsList.jsx props', props)
    // alert('props', props)
    bug('props.jobs', props.jobs, props.cities, props.allLoaded)

    
    const ListWrapper = styled.div`
        background: white;
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        width: 500px;
    `;

    const List = () => (props.allLoaded() ?
            <div>Loaded</div> :
            <p>Loading...</p>);
    
    return (
        <ListWrapper >
            <List />
        </ListWrapper >
    );

    // return <ListWrapper />;
};