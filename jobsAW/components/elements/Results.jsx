import React, { Component } from 'react';
import styled from 'styled-components';

import bug from '../../../_libs/bug';

import RList from './RList';

const Wrapper = styled.div`
    background: aliceblue;
    flex: 1; /* same as flex: 1 1 auto; */

    display: flex;
    flex-direction: row;
    
    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */    

    margin-top: 148.5px;
    margin-bottom: 32px;
    padding-bottom: 32px;
`;

// const Results = styled.div`
//     background: rgba(0, 0, 0, .3);
//     border: 1px solid #000000;

//     flex: 1; /* same as flex: 1 1 auto; */
    
//     /* Needed for when the area gets squished too far and there is content that can't be displayed */
//     overflow: auto; 
// `;

export default class Results extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // const props = this.props;
        const props = nextProps;

        // bug.rt('*** Results.jsx props', props)
        // bug.rt('*** Results.jsx __isDragging', props.state.ui.filter.__isDragging)

        return !props.state.ui.filter.__isDragging;

    }
    render() {
        const props = this.props;

        return (
            <Wrapper>
                <RList {...props} />
                {/* <Results>
                    Hurz
                </Results> */}
            </Wrapper>
        );
    }
}

// export default (props) => {
//                                                     bug.rt('*** Results.jsx props', props)
//                                             bug.rt('*** Results.jsx __isDragging', props.state.ui.filter.__isDragging)
//     if (props.state.ui.filter.__isDragging) {
//         return false;
//     }

//     return (
//         <Wrapper>
//             <RList {...props} />
//             {/* <Results>
//                 Hurz
//             </Results> */}
//         </Wrapper>
//     );
// }