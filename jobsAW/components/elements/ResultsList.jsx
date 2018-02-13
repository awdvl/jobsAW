import React from 'react';
import styled from 'styled-components';

const bug = console.log;

// export default ResultsList;
export default  (props) => {
    bug('ResultsList.jsx props', props)
    bug('props.jobs', props.jobs, props.cities)

    
    const List = styled.div`
        background: white;
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        width: 500px;
    `;

    // const list = (
    //     <div>
    //         Blöd
    //     </div>
    // )
    
    return <List />;
};