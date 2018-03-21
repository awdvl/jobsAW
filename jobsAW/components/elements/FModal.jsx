import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import FModalSelected from './FModalSelected';

import { moveElem } from '../../../_libs/dnd';
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


class ReactModalAdapter extends Component {
    static propTypes = {
        className: PropTypes.string,
        modalClassName: PropTypes.string,
        overlayClassName: PropTypes.string,

        loc: PropTypes.object.isRequired,
        modalIsOpen: PropTypes.bool.isRequired,
        modalType: PropTypes.string.isRequired,
        closeModal: PropTypes.func.isRequired,

        updateFilter: PropTypes.func.isRequired,
        setIsMoving: PropTypes.func.isRequired,
        setIsMovingFromZone: PropTypes.func.isRequired,
        getFilterTopOnly: PropTypes.func.isRequired,

    }

    shouldComponentUpdate (nextProps) {
                                                            // bug('ReactModalAdapter nextProps', nextProps, this.props)
        // do not update if both flags are false
        return nextProps.modalIsOpen || this.props.modalIsOpen;
    }

    render () {

        const {
            className,
            modalClassName,
            overlayClassName,

            loc,
            modalIsOpen,
            modalType,
            closeModal,

            updateFilter, 
            setIsMoving, 
            setIsMovingFromZone,
            getFilterTopOnly,

            selectable,

        } = this.props;
                                                                // bug('REactModalAdapter props', this.props);
                                                            // bug('+++ selectable', selectable)
        const reactModalContent = ({
            modalType,
            closeModal,
            loc,
            updateFilter, 
            setIsMoving, 
            setIsMovingFromZone,
            getFilterTopOnly,
            
        }) => {
            if (modalType !== '') {
                const modalTitle = loc.filter.get (modalType);  // from props

                const moveFilter = moveElem (updateFilter, {
                    type: modalType, setIsMovingFromZone
                });

                const topOnly = getFilterTopOnly (modalType);
                                                                                        // bug('topOnly', topOnly)
                                            // bug('*** reactModalContent - loc', loc)
                return (
                    <div>
                        <FMHeader>
                            <FMHTitle>
                                {modalTitle}
                            </FMHTitle>

                            <CloseModalButton onClick={closeModal} />
                        </FMHeader>

                        <FModalSelected
                            zoneType='sel'
                            moveFilter={moveFilter}
                            topOnly={topOnly}
                            {...this.props}
                        />

                        <FModalSelected
                            zoneType='rest'
                            moveFilter={moveFilter}
                            // topOnly={topOnly}
                            {...this.props}
                        />

                        <FModalSelected
                            zoneType='excl'
                            moveFilter={moveFilter}
                            // topOnly={topOnly}
                            {...this.props}
                        />

                    </div>
                );
            }

            return;

        };


        return (
            <ReactModal
                className={modalClassName}
                portalClassName={className}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                overlayClassName={overlayClassName}
            // modalClassName={modalClassName}
            // onAfterOpen={this.afterOpenModal}
            // style={customStyles}
            // contentLabel="Example Modal"            
            >
                {reactModalContent({
                    modalType,
                    closeModal,
                    loc,
                    updateFilter, 
                    setIsMoving, 
                    setIsMovingFromZone,
                    getFilterTopOnly,
                })}

            </ReactModal>
        )
    }
}



const StyledModal = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal',
}) `
    .Modal {
        /* width: 820px; */
        width: 800px;
        background: seagreen;
        position: absolute;
        top: 0px;
        left: 211px;
    }
    .Overlay {
        background: #3d4641;
        opacity: .95;
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
