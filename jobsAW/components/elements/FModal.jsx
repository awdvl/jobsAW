import React, { Component } from 'react';
import styled from 'styled-components';

import bug from '../../../_lib/bug';


const FMContainer = styled.div`
    width: 820px;
    background: seagreen;
`;

const FMHeader = styled.div`
    width: 800px;
    height: 80px;
    background: blanchedalmond;
`;

export default class FilterModal extends Component {

    shouldComponentUpdate (nextProps) {
        // if (openFlag)

        return true;
    }

    render() {
        return (
            <FMContainer>
                <FMHeader>
                    City
                </FMHeader>
            </FMContainer>
        )
    }

}
