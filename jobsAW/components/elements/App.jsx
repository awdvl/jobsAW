import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import bug from '../../../_libs/bug';

import '../../styles/base.css';
import styled from 'styled-components';

import { filterTypes } from '../../constants/filter';


import Head from './Head';
import Filters from '../../containers/filter';
import Results from './Results';
import Footer from './Footer';

// import { Iterable } from 'immutable';
import { getLoc, getJobData, getData } from '../../selectors';

// s. https://jsfiddle.net/MadLittleMods/LmYay/
const Site = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    height: 100%;

    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */
            
    background: rgba(255, 255, 255, .1);
`;

@DragDropContext(HTML5Backend)
class JobsList extends Component {
    static propTypes = {
        loader: PropTypes.func.isRequired,
        fetchCities: PropTypes.func.isRequired,
        fetchCompanies: PropTypes.func.isRequired,
        fetchLocCommon: PropTypes.func.isRequired,
        fetchJobs: PropTypes.func.isRequired,
        loaded: PropTypes.bool.isRequired,
        loc: PropTypes.object.isRequired,
        jobs: PropTypes.array.isRequired,
        modalIsOpen: PropTypes.bool.isRequired,
        filterIsMoving: PropTypes.bool.isRequired,
    }

    getData() {
        const { loader, fetchCities, fetchCompanies, fetchLocCommon, fetchJobs } = this.props;
        
        loader ([fetchCities, fetchCompanies, fetchLocCommon, fetchJobs]);
    }

    loadSelectablesIntoFilterRecord() {
        const { loaded, setSelectables, selectableFilters, setSelectablesLoadedFlag, selectablesLoadedFlag } = this.props;

        if (!selectablesLoadedFlag && loaded) {
            setSelectablesLoadedFlag (true);
            
            filterTypes.map ((filter, index) => 
                setSelectables (filter, selectableFilters[index]));
            // filterTypes.map ((filter, index) => {
            //                                                     bug ('index', index,selectableFilters[index])
            //     return setSelectables (filter, selectableFilters[index]);
            // })
        }
    }

    componentDidMount() {
        this.getData ();
    }

    componentDidUpdate(prevProps) {
        this.loadSelectablesIntoFilterRecord ();
    }


    render () {
                                                            bug('App.jsx -> this.props', this.props)
        const { loaded, loc, jobs, modalIsOpen, filterIsMoving } = this.props;
                                                        // bug('getLoc.recomputations()', getLoc.recomputations())
                                                        // bug('getJobData.recomputations()', getJobData.recomputations())
                                                        // bug('getData.recomputations()', getData.recomputations())
        return (
            <Site>
                <Head></Head>
                <Filters 
                    loc={loc}
                />
                <Results 
                    loaded={loaded} 
                    jobs={jobs} 
                    modalIsOpen={modalIsOpen}
                    filterIsMoving={filterIsMoving}
                />
                <Footer />
            </Site>
        );        
    }
}


export default JobsList;