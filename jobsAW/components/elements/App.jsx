import React, { Component } from 'react';
import bug from '../../../_libs/bug';

import '../../styles/base.css';
import styled from 'styled-components';

import { finishedLc } from '../../utils/loadCtrl';

import Head from './Head';
// import Filters from './FilterSection';
import Filters from '../../containers/filter';
import Results from './Results';
import Footer from './Footer';


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


class JobsList extends Component {
    componentDidMount() {
        this.getData();
    }

    getData() {
        const { loadCtrl, fetchCities, fetchCompanies, fetchLocCommon, fetchJobs } = this.props;
                                                            bug.rt('App.jsx::getData, this.props', this.props);
        // init load control for fetch actions - pass number of async fetch actions
        loadCtrl(4);
        // -->> these in loadCtrl instead of number?
        fetchCities();
        fetchCompanies();
        fetchLocCommon();
        fetchJobs();
    }


    render () {
                                                            bug('App.jsx -> this.props', this.props)
                                                            bug.rt('rt: App.jsx -> this.props', this.props)
        const { state, loc } = this.props;

        return (
            <Site>
                <Head></Head>
                <Filters 
                    // state={state}
                    loc={loc}
                    // {...this.props}
                />
                <Results 
                    allLoaded={finishedLc(state)}  // or reducers.getAllLoaded(state)
                    {...this.props} 
                />
                <Footer />
            </Site>
        );        
    }
}


export default JobsList;