import simpleLoadCtrl from '../../_libs/simpleLoadCtrl';
import { FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT } from '../constants/fetch';

const loadCtrl =  simpleLoadCtrl(FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT);

export const actionLc = loadCtrl.action;
export const reducerLc = loadCtrl.reducer;
export const dispatchIncLc = loadCtrl.dispatchInc;
export const checkStatusLc = loadCtrl.checkStatus;
