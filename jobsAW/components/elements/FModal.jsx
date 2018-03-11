import React, { Component } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import FModalSelected from './FModalSelected';

import bug from '../../../_libs/bug';


// const FMContainer = styled.div`
//     width: 820px;
//     background: seagreen;
// `;

const FMHeader = styled.div`
    width: 800px;
    /* height: 80px; */
    background: white;
    border-bottom: 1px solid #7f8c89;
    padding: 0 .5em;

    display: flex;
`;

// color as  theme
const FMHTitle = styled.div`
    color: #1f2021;  
    font-size: 1.5em;
    padding: .5em 1.5em;

    flex: 1;
`;

const ModalButton = SoftButton.extend`
    width: 50px;
    height: 50px;
    background: transparent;
`;

const CloseModalButton = ModalButton.extend`

    color: #9dd0c6;

    /* &:after {
        content: '\00D7';
        font-size: 3em;
    } */
    &:after {
        content: '\\2713';
        font-size: 2em;
    }

    &:hover {
        color: #f35d5d;
    }
`;


const ReactModalAdapter = ({ className, modalClassName, ...props}) => {
    bug('REactModalAdapter props', props);

    const modalTitle = 'City';  // from props

    return (
        <ReactModal
            className={modalClassName}
            portalClassName={className}
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            shouldCloseOnOverlayClick={true}
            {...props}
            // onAfterOpen={this.afterOpenModal}
            // style={customStyles}
            // contentLabel="Example Modal"            
        >
            <FMHeader>
                <FMHTitle>
                    {modalTitle}
                </FMHTitle>
                
                <CloseModalButton onClick={props.closeModal} />
            </FMHeader>

            <FModalSelected />

        </ReactModal>
    );
};

const StyledModal = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal',
})`
    .Modal {
        /* width: 820px; */
        width: 800px;
        background: seagreen;
        position: absolute;
        top: 0px;
        left: 211px;
    }
    .Overlay {
        background: silver;
        opacity: .92;
        position: absolute;
        top: 130px;
        bottom: 0;
        left: 0;
        right: 0;
    }
`;

export default StyledModal;


// export default class FilterModal extends Component {

//     shouldComponentUpdate (nextProps) {
//         // if (openFlag)

//         return true;
//     }

//     render() {
//         return (
//             <FMContainer>
//                 <FMHeader>
//                     City
//                 </FMHeader>
//             </FMContainer>
//         )
//     }

// }
