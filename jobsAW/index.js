import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createReduxStore from '../_libs/createReduxStore';
import reducer from './reducers';
import Container from './middleware/container';

const store = createReduxStore(reducer);

render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('app')
);