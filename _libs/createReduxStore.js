import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

export default (reducer, middleWares=[]) => {
    if (process.env.NODE_ENV !== 'production') {
        middleWares.push(createLogger());
    }
    
    const store = createStore(
        reducer,
        applyMiddleware(...middleWares)
    );

    return store;
};