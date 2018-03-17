import React, { Component } from 'react';
import PropTypes from 'prop-types';

import bug from '../../../_libs/bug';

class StateComponent extends Component {
    constructor() {
        super ();

        this.state = {
            hover: false,
            focus: false,
            active: false,
        };
    }

    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div 
                onMouseEnter={() => (this.setState({ hover: true }))}
                onMouseLeave={() => (this.setState({ hover: false }))}
                onFocus={() => (this.setState({ focus: true }))}
                onBlur={() => (this.setState({ focus: false }))}
                onClick={() => (this.setState((prevState) => ({
                    active: !prevState.active
                })))}
            >
                {this.props.children(this.state)}
            </div>
        );
    }
}

export default StateComponent;
