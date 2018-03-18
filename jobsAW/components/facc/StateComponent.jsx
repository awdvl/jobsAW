import React, { Component } from 'react';
import PropTypes from 'prop-types';

import bug from '../../../_libs/bug';

class StateComponent extends Component {
    constructor(props) {
        super (props);

        this.state = {
            hover: false,
            hoverP: false,
            focus: false,
            // active: false,
            active: this.props.active,
        };
    }

    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div 
                onMouseEnter={() => (
                    // this.setState ({ hover: true })
                    this.setState ((prevState) => {
                        // bug('** enter prevState', prevState)
                        // const hoverP = prevState.active && prevState.hoverP ? false : true;
                        return {
                            hover: true,
                            hoverP: true
                        }
                    }
                ))}
                // onMouseEnter={() => (this.setState({ hover: true }))}
                // onMouseEnter={() => (this.setState((prevState) => ({
                //     hover: !prevState.hover
                // })))}
                // onMouseLeave={() => (this.setState({ hover: false }))}
                // onMouseLeave={() => (this.setState({ hover: false, hoverP: false }))}
                onMouseLeave={() => (this.setState((prevState) => {
                        // bug('** leave prevState', prevState)
                        // const hoverP = prevState.active && prevState.hoverP ? false : true;
                        return {
                            hover: false,
                            hoverP: false
                        }
                    }
                ))}

                onFocus={() => (this.setState({ focus: true }))}
                onBlur={() => (this.setState({ focus: false }))}
                onClick={() => (this.setState((prevState) => {
                    // bug('** click prevState', prevState)
                    
                    return {
                        active: !prevState.active,
                        hoverP: false
                }}))}
                // onClick={() => (this.setState((prevState) => ({
                //     active: !prevState.active
                // })))}
            >
                {this.props.children(this.state)}
            </div>
        );
    }
}

export default StateComponent;
