// import { Map } from 'immutable';
import { FETCH_LOC_COMMON_SUCCESS, FETCH_LOC_COMMON_ERROR } from '../constants/fetch';
import buildDumbDataReducer from '../utils/buildDumbDataReducer';

export default buildDumbDataReducer(FETCH_LOC_COMMON_SUCCESS, FETCH_LOC_COMMON_ERROR, 'mergeDeep');

