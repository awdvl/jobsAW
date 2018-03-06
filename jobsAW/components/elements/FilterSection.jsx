import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import FElem from './FElem';

import bug from '../../../_libs/bug';

const Wrapper = styled.div`
    font-size: 1.5em;
    color: gray;
    /* background: darkseagreen; */
    padding: 1em 2.5em;
    width: 100%;
    position: fixed;
    margin-top: 58.5px;
    background: wheat;

    display: flex;

`;

const Header = styled.div`
    width: 5em;
    height: 1.25em;
    margin-right: 2em;
    background: white;
    /* float: left; */
`;

// const FComp = styled.div`
//     background: snow;
//     padding: .5em;
//     /* line-height: .75em; */
// `;

// const FCompButton = SoftButton.extend`
//     padding: .25em;
//     border-radius: 3px;

//     &:hover {
//         background: #d9e4e4;
//     }
//     /* &:focus {
//         border-color: red;
//     } */
// `;

// const clickFilterButton = (e) => {
//     bug('button clicked!')
// };


// const makeFilterButton = (text) => {
//     return (
//         <FCompButton
//             onClick={clickFilterButton}
//         >
//             {text}
//         </FCompButton>
//     );

// };

// class FilterElem extends Component {

//     render() {
//         // const { elem, text} = this.props;
//         const { text } = this.props;

//         const component = (
//             // <FComp key={elem} >
//             <FComp>
//                 {makeFilterButton(text)}
//             </FComp>
//         );

//         return component;

//     }
// }

const FilterElems = (
    state,
    loc

) => {
    // bug('filterProps', filterProps)
    const __order = state.__order
    // bug('__order', __order)
    // bug('loc', loc)

    if (loc) {
        return __order.map((elem) => {
            // bug('orderedElem', elem, loc.get(elem))
            const text = loc.get(elem);

            return (
                <FElem key={elem}
                    id={elem}
                    text={text}
                />

            );

            // return (
            //     <FComp key={elem} >
            //         {makeFilterButton(text)}
            //     </FComp>

            // );
        });

    }
    // else Loading...??

    return (
        <span>Loading...</span>
        // bug('             --->> return')
    );
};

class Filters extends Component {

    render() {
                                                                    bug('Filters this.props', this.props)
        const { state, loc } = this.props;

        return (
            <Wrapper>
                <Header>
                    Filter
                </Header>

                {FilterElems(state.ui.filter, loc.filter)}

            </Wrapper>
        );
    }
}

export default DragDropContext(HTML5Backend)(Filters);
// export default Filters;

// export default () => (
//     <Wrapper>
//         <Header>
//             Filter
//         </Header>
//         <FComp>
//             <FCompButton
//                 onClick={clickFilterButton}
//             >
//                 City
//             </FCompButton>
//         </FComp>
//     </Wrapper>
// );