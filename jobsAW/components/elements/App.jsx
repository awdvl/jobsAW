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

    // allLoaded(state) {
    //     const key = 'fetchCtrl';
    //     const loadCtrl = state[key];

    //     return loadCtrl.get('n') === loadCtrl.get('i');
    // }
    checkLoadStatus(loadCtrl) {
        // const key = 'fetchCtrl';
        // const loadCtrl = state[key];

        return loadCtrl.get('n') === loadCtrl.get('i');
    }

    render () {
        bug('App.jsx -> this.props', this.props)
        const { state } = this.props;
        const key = 'fetchCtrl';
        const loadCtrl = state[key];

        const checkLoadStatus = (loadCtrl) => () => loadCtrl.get('n') === loadCtrl.get('i');
        // const checkLoadStatus = (loadCtrl) => () => {
        //     bug('"loadCtrl.get(n)"', loadCtrl.get('n'));
        //     bug('"loadCtrl.get(i)"', loadCtrl.get('i'));
        //     bug('comp', loadCtrl.get('n') === loadCtrl.get('i'))

        //     return loadCtrl.get('n') === loadCtrl.get('i');
        // }
        
        // bug('checkLoadStatus(loadCtrl)', checkLoadStatus(loadCtrl))
        // bug('checkLoadStatus(loadCtrl)()', checkLoadStatus(loadCtrl)())

//         const allLoaded = checkLoadStatus(loadCtrl);
// bug('allLoaded', allLoaded)

        // const Content = () => (this.allLoaded(this.props.state) ?
        //     <div>
        //         <Filter />
        //         <Results 
        //             allLoaded={this.allLoaded} 
        //             props={this.props} 
        //         />
        //     </div> :

        //     <p>Loading...</p> );
    
        return (
            <Site>
                <Head></Head>
                {/* <Content /> */}
                <Filter />
                <Results 
                    // allLoaded={this.allLoaded}
                    // allLoaded={allLoaded}
                    allLoaded={checkLoadStatus(loadCtrl)}
                    loadCtrl={this.props.state.fetchCtrl}
                    props={this.props} 
                />
                <Footer />
            </Site>
        );        
    }
}



export default JobsList;