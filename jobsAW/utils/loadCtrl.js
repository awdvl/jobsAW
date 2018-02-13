import simpleLoadCtrl from './simpleLoadCtrl';
import { FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT } from '../constants/fetch';

// const loadCtrl = new simpleLoadCtrl(1, FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT);
const loadCtrl = simpleLoadCtrl(1, FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT);

console.log('loadCtrl', loadCtrl)

export default loadCtrl;