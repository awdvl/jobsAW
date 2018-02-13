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
        // const { state, getCities, getCompanies, fetched } = this.props;
        // getCities(fetched);
        // getCompanies();
        // this.props.getLocCommon();
        // this.props.getJobs();

        const { fetchCities, fetchCompanies, fetchLocCommon, fetchJobs } = this.props;

        fetchCities();
        fetchCompanies();
        fetchLocCommon();
        fetchJobs();

    }



    render () {
        return (
            <Site>
                <Head></Head>
                <Filter />
                <Results />
                <Footer />
                {/* HURZ */}
            </Site>
        );        
    }
}



export default JobsList;