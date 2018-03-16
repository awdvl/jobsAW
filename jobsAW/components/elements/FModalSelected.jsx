import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ItemTypes from '../../constants/itemTypes';
// import { findElemFor, moveElemFor, moveElemFor2 } from '../../../_libs/dnd';
import { findElemFor, moveElemFor2 } from '../../../_libs/dnd';

import FMSElem from './FMSElem';
import styled from 'styled-components';

// import { getMovingFromZone } from '../../reducers/filter';

import bug from '../../../_libs/bug';
import { isNull } from 'util';

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
        // const { id, zoneType } = monitor.getItem();
        const { id } = monitor.getItem ();
        const { 
            getFilterZone,
            updateOrder,
            modalType,
            zoneType,
            // setIsMoving,
            setMovingFromZone,
            movedFromZone: currentZoneType,
        } = props;

    
                                                        // bug('FModalSelected::filterTarget:hover - zoneType', zoneType)
        // const currentZoneType = isNull (props.movedFromZone) ?
        //     zoneType :
        //     props.movedFromZone;
            
        // const toZone = props.getFilterZone (modalType, zoneType);

                    // bug('*** FModalSelected::filterTarget:hover - toZone',toZone, toZone.size)
        // bug('*** FModalSelected::filterTarget:hover currentZoneType, props.zoneType', currentZoneType, props.zoneType)

        if (currentZoneType !== zoneType) {
            const fromZone = getFilterZone (modalType, currentZoneType);
            const toZone = getFilterZone (modalType, zoneType);
            const overIndex = toZone.size;

            // const moveFilter = moveElemFor (fromZone, updateOrder, {
            //     env: currentZoneType, type: modalType, setIsMoving, setMovingFromZone
            // });

            // moveFilter (id, overIndex, zoneType);

            props.moveFilter (fromZone, id, overIndex, [currentZoneType, zoneType]);
            // props.moveFilter (id, overIndex, props.zoneType);
        }
                                                                                                        
    },

    drop(props, monitor, component) {
                                            // bug('*** drop  props, monitor, component', props, monitor, component)
        // props.setIsMoving (false);
            props.setMovingFromZone (null);
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
        
        updateOrder: PropTypes.func.isRequired,
        // setIsMoving: PropTypes.func.isRequired,
        setMovingFromZone: PropTypes.func.isRequired,
    }

    render() {
                                                                bug('FModalSelected this.props', this.props)

        const {
            connectDropTarget,
            modalType,
            zoneType,
                getFilterZone,
                moveFilter,
            updateOrder,
            // setIsMoving,
            setMovingFromZone,

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
                        </SectionTitle>
                    </SectionHeader>

                    <SectionBody>
                        {SecElems({
                            zoneFilterOrder,
                            // moveFilter: moveElemFor (zoneFilterOrder, updateOrder, {
                            //     env: zoneType, type: modalType, setIsMoving, setMovingFromZone
                            // }),
                            // moveFilter: moveElemFor2 (updateOrder, {
                            //     type: modalType, setIsMoving, setMovingFromZone
                            // }),
                            moveFilter,
                            findFilter: findElemFor (zoneFilterOrder),
                            ...this.props
                        })}
                    </SectionBody>

                </Section>
            </div>
        );
    }
}