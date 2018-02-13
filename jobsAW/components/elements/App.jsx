// import React from 'react';
import React, { Component } from 'react';
import '../../base.css';
import styled from 'styled-components';

import Head from './Head';
import Filter from './FilterSection';
import Results from './Results';
import Footer from './Footer';

const bug = console.log;

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
                                bug('JobsList.jsx, this.props', this.props);

        const { fetchCtrl, fetchCities, fetchCompanies, fetchLocCommon, fetchJobs } = this.props;

        // pass number of async fetch actions
        fetchCtrl(1);

        fetchCities();
        fetchCompanies();
        fetchLocCommon();
        fetchJobs();

    }



    render () {
        bug('App.jsx -> this.props', this.props)
        return (
            <Site>
                <Head></Head>
                <Filter />
                <Results props={this.props} />
                <Footer />
                {/* HURZ */}
            </Site>
        );        
    }
}



export default JobsList;