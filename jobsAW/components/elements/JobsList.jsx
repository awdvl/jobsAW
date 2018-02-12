// import React from 'react';
import React, { Component } from 'react';

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
        const { state, getCities, getCompanies, fetched } = this.props;
        getCities(fetched);
        getCompanies();
        this.props.getLocCommon();
        this.props.getJobs();
    }

    render () {
        return (
            <div>
                HURZ
            </div>
        );        
    }
}



export default JobsList;