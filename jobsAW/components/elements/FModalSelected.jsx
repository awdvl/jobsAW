import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ItemTypes from '../../constants/itemTypes';
import { findElem } from '../../../_libs/dnd';

import HoverText from './HoverText';

import FMSElem from './FMSElem';
import styled from 'styled-components';
import { SoftButton } from '../../styles/components';


import bug from '../../../_libs/bug';

const Section = styled.div`
    background: #e1e8d6; 
    width: 100%;
    border-bottom: 1px solid gray;

    display: flex;
    flex-direction: column;
`;

const SectionHeader = styled.div`
    height: 2.75em;
    background: #f2f5ef;
    display: flex;
`;

const SectionTitle = styled.div`
    color: #5d6d4c;
    font-size: 1.25em;
    line-height: 2.2em;
    padding: 0 1.75em 0 3.5em;
`;

const SectionBody = styled.div`
    min-height: 5.5em;
    padding: 1em;
    display: flex;
`;

const OnlyTopButton = SoftButton.extend`
    margin: 0 2em;
    padding: .35em 0.75em;
    border: 1px solid #7cbd7e;
    /* background: #c4ffc6; */
    /* background: ${props => ('#c4ffc6')} ; */
    background: ${props => {
        bug ('++ OnlyTopButton props', props)
        /* ('#c4ffc6') */
        return props.onlyTop ? 'turquoise' : '#c4ffc6'
    }};
`;

const locRefForModalType = {
    jobType: ['job', 'type'],
    compIndy: ['comp', 'indy'],
    compEmply: ['comp', 'emply'],
    city: ['city', 'name'],
};

const getLocForModalType = (loc, modalType) => {
    const locRef = locRefForModalType[modalType];
                                    // bug('*** FModalSelected::getLocForModalType - loc, modalType, locRef', 
                                    //         loc, modalType, locRef, loc[locRef[0]], loc[locRef[0]].get (locRef[1]))
    return loc[locRef[0]].get (locRef[1]);
}

const SecElems = (props) => {
    // bug('SEcElems props', props)
    const { loc, modalType } = props;
                                                                                    // bug('SecElems props', props)
    if (loc) {
        // const type = 'city';
        // const locForElem = loc[type].get('name')
        const locForElem = getLocForModalType (loc, modalType)
                                                                //                     bug('*** locForElem', locForElem)
                                                                // bug('*** props.zoneFilterOrder', props.zoneFilterOrder)
        return props.zoneFilterOrder.map ((elem) => {
                                                                //                     bug('*** order elem', elem)
                                                                // bug('*** text ', locForElem.get (String (elem)))
            return (
                <FMSElem 
                    key={elem}
                    id={elem}
                    text={locForElem.get (String (elem))}
                    {...props}
                />
            );
        });
    }

    return <span>Loading...</span>;
};

const filterTarget = {
    hover(props, monitor, component) {
                        // bug('FModalSelected::filterTarget:hover - props, monitor, component', props, monitor, component)
        const { id } = monitor.getItem ();
        const { 
            getFilterZone,
            updateFilter,
            modalType,
            zoneType,
            setIsMovingFromZone,
            movedFromZone: currentZoneType,
        } = props;


        if (currentZoneType !== zoneType) {
            const fromZone = getFilterZone (modalType, currentZoneType);
            const toZone = getFilterZone (modalType, zoneType);
            const overIndex = toZone.size;
                                                                                // bug('elemO fromZone', fromZone)
            props.moveFilter (fromZone, id, overIndex, [currentZoneType, zoneType]);
        }
                                                                                                        
    },

    drop(props, monitor, component) {
                                            // bug('*** drop  props, monitor, component', props, monitor, component)
        props.setIsMovingFromZone (null);
    }
};

const onlyTopButton = (modalType, zoneType, toggleOnlyTop, onlyTop) => {
    const textFalse = 'show only results for the top selection';
    const textTrue = 'show results for the top selection first';

    let text = textFalse;

    if (zoneType === 'sel') {
        // return (
        //     <OnlyTopButton 
        //         onlyTop={onlyTop}
        //         onClick={() => toggleOnlyTop(modalType)}
        //         onMouseEnter={() => text = textTrue}
        //     >
        //         {text}
        //     </OnlyTopButton>
        // );
        return (
            <HoverText>
                {(isHovered) => {
                    const text = isHovered ? 'Button hovered' : 'Button ent-hovered'
                    bug('** isHovered', isHovered);
                    return (<div>{text}</div>);
                    // return (<div>Hörzer</div>);
                }}
            </HoverText>
        );
    }
};

@DropTarget(ItemTypes.FILTERZ, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class FModalSelected extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        modalType: PropTypes.string.isRequired,
        zoneType: PropTypes.string.isRequired,
            getFilterZone: PropTypes.func.isRequired,
            moveFilter: PropTypes.func.isRequired,
        
        updateFilter: PropTypes.func.isRequired,
        setIsMovingFromZone: PropTypes.func.isRequired,
        toggleOnlyTop: PropTypes.func.isRequired,
        onlyTop2: PropTypes.bool.isRequired,
    }

    render() {
                                                                // bug('FModalSelected this.props', this.props)

        const {
            connectDropTarget,
            modalType,
            zoneType,
            getFilterZone,
            moveFilter,
            updateFilter,
            setIsMovingFromZone,
            toggleOnlyTop,
            onlyTop2,

        } = this.props;

        // in extern loc
        const uiLoc = {
            zone: {
                sel: {
                    title: 'Top'
                },
                excl: {
                    title: 'Excluded'
                }
            }
        };

                                                                        // bug('modalType, zoneType', modalType, zoneType)
        const zoneLoc = uiLoc.zone[zoneType];  

        const zoneFilterOrder = getFilterZone (modalType, zoneType);
                                                                        // bug('zoneFilterOrder', zoneFilterOrder)
        return connectDropTarget (
            <div>
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            {zoneLoc.title}
                            {onlyTopButton (modalType, zoneType, toggleOnlyTop, onlyTop2)}
                        </SectionTitle>
                    </SectionHeader>

                    <SectionBody>
                        {SecElems({
                            zoneFilterOrder,
                            moveFilter,
                            findFilter: findElem (zoneFilterOrder),
                            ...this.props
                        })}
                    </SectionBody>

                </Section>
            </div>
        );
    }
}