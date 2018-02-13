import { fromJS } from 'immutable';
import { FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT } from '../constants/fetch';

const bug = console.log;

const initState = fromJS({n: 0, i: 0});

const fetchCtrl = (state=initState, action) => {
    switch (action.type) {
        case FETCH_CTRL_SET_NUMBER:
            return state.set('n', action.payload);

        case FETCH_CTRL_INCREMENT:
            return state.update('i', i => i + 1);

        default: 
            return state;
    }
};

export default fetchCtrl;