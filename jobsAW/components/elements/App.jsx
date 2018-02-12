// import React from 'react';
import React, { Component } from 'react';
// import styled from 'styled-components';
import Head from './Head';
import Filter from './FilterSection';

const bug = console.log;

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

    // const Head =
    render () {
        return (
            <div>
                <Head></Head>
                <Filter />
                {/* <Results /> */}
                {/* <Foot /> */}
                {/* HURZ */}
            </div>
        );        
    }
}



export default JobsList;