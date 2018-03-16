import React, { Component } from 'react';

class HoverText extends Component {
    constructor() {
        super (...arguments);

        this.state = {
            hovered: false
        };
    }

    render() {
        return (
            <div 
                onMouseEnter={() => (this.setState({ hovered: true }))}
                onMouseLeave={() => (this.setState({ hovered: false }))}
            >
             {/* <div onMouseEnter={() => {
                console.log('HOverText mouseEnter')
                // this.setState((prevState, props) => ({
                //     hovered: !prevState.hovered
                // }))
                this.setState({ hovered: true });
            }}> */}
                {this.props.children(this.state.hovered)}
            </div>
        );
    }
}

export default HoverText;
