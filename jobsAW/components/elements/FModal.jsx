import React, { Component } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


// const FMContainer = styled.div`
//     width: 820px;
//     background: seagreen;
// `;

const FMHeader = styled.div`
    width: 800px;
    height: 80px;
    background: blanchedalmond;
`;

const ModalButton = SoftButton.extend`
    width: 50px;
    height: 50px;
    background: transparent;
`;

const CloseModalButton = ModalButton.extend`
    /* &:content: &times; */

    &:hover {
        color: red;
    }
`;

const ReactModalAdapter = ({ className, modalClassName, ...props}) => {
    bug('REactModalAdapter props', props);

    return (
        <ReactModal
            className={modalClassName}
            portalClassName={className}
            isOpen={props.modalIsOpen}
            {...props}
            // onAfterOpen={this.afterOpenModal}
            // onRequestClose={this.closeModal}
            // style={customStyles}
            // contentLabel="Example Modal"            
        >
            <FMHeader>
                City
                <CloseModalButton />
            </FMHeader>
        </ReactModal>
    );
};

const StyledModal = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal',
})`
    .Modal {
        width: 820px;
        background: seagreen;
        position: absolute;
        top: 0px;
        left: 211px;
    }
    .Overlay {
        background: silver;
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
