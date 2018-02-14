// import React from 'react';
import React, { Component } from 'react';
import '../../base.css';
import styled from 'styled-components';

import bug from '../../../_libs/bug';
import { finishedLc } from '../../utils/loadCtrl';

import Head from './Head';
import Filter from './FilterSection';
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

// const JobsList = (props) => {
//     bug(props);
//     return (
//         <div>
//             HURZ
//         </div>
//     );
// }

class JobsList extends Component {
    componentDidMount() {
        this.getData();
    }

    getData() {
                                                            bug.rt('App.jsx::getData, this.props', this.props);
        const { loadCtrl, fetchCities, fetchCompanies, fetchLocCommon, fetchJobs } = this.props;

        // init load control for fetch actions - pass number of async fetch actions
        loadCtrl(4);

        fetchCities();
        fetchCompanies();
        fetchLocCommon();
        fetchJobs();

    }


    render () {
                                                            bug('App.jsx -> this.props', this.props)
        const { state } = this.props;

        
        return (
            <Site>
                <Head></Head>
                <Filter />
                <Results 
                    // allLoaded={checkStatusLc(state.loadCtrl)}
                    // allLoaded={finishedLc(state.loadCtrl)}  // here or reducers.getAllLoaded(state)
                    allLoaded={finishedLc(state)}  // here or reducers.getAllLoaded(state)
                    {...this.props} 
                    // props={...this.props} 
                />
                <Footer />
            </Site>
        );        
    }
}


export default JobsList;