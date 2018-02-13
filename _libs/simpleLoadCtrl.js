import { fromJS } from 'immutable';

// const bug = console.log;
/**
 *  A simple loading control
 * 
 *      Observes the number of the loaded items
 * 
 *  Usage
 *      init an instance in a util component (e.g. loadCtrl):
 *          import simpleLoadCtrl from '../../_libs/simpleLoadCtrl';
 *          import { FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT } from '../constants/fetch';
 * 
 *          const loadCtrl =  simpleLoadCtrl(FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT);
 * 
 *          export const actionLc = loadCtrl.action;
 *          export const reducerLc = loadCtrl.reducer;
 *          export const dispatchIncLc = loadCtrl.dispatchInc;
 *          export const checkStatusLc = loadCtrl.checkStatus;
 * 
 *      actions: 
 *          export { actionLc as loadCtrl };
 *          dispatchIncLc(dispatch); at the end of every successful fetch promise
 * 
 *      reducers:
 *          combine loadCtrl: reducerLc, into reducers
 * 
 *      componentDidMount:
 *          call action loadCtrl(n) with n as number of load actions
 * 
 *      component rendering:
 *          add a props allLoaded={checkStatusLc(state.loadCtrl)}
 * 
 *      check for allLoaded by allLoaded() [true/false]
 */
export default (
    setActionConst = 'LOADER_SET', 
    incActionConst = 'LOADER_INC'
) => {
    const initState = fromJS({n: 0, i: 0});

    return {
        action(n) {
            return (dispatch) => {
                dispatch({
                    type: setActionConst,
                    payload: n
                });
            };
        },

        reducer(state=initState, action) {
            switch (action.type) {
                case setActionConst:
                    return state.set('n', action.payload);
        
                case incActionConst:
                    return state.update('i', i => i + 1);
        
                default: 
                    return state;
            }
        },

        dispatchInc(dispatch) {
            return dispatch({
                type: incActionConst
            });
        },

        checkStatus(loadCtrlState) { 
            return () => loadCtrlState.get('n') === loadCtrlState.get('i');
        }

    };
}
