import { fromJS } from 'immutable';

const bug = console.log;

const simpleLoadCtrl = (
    nItemsToLoad, 
    setActionConst = 'LOADER_SET', 
    incActionConst = 'LOADER_INC'
) => {
    const initState = fromJS({n: 0, i: 0});

    return {
        loadCtrlAction(n) {
            return (dispatch) => {
                dispatch({
                    type: setActionConst,
                    payload: n
                });
            };
        },

        loadCtrlReducer(state=initState, action) {
            switch (action.type) {
                case setActionConst:
                    return state.set('n', action.payload);
        
                case incActionConst:
                    return state.update('i', i => i + 1);
        
                default: 
                    return state;
            }
        },

        dispatchLoadInc(dispatch) {
            return dispatch({
                type: incActionConst
            });
        }
    };
}




// class simpleLoadCtrl {
//     constructor(nItemsToLoad, setActionConst = 'LOADER_SET', incrementActionConst = 'LOADER_INC') {
//         this.n = nItemsToLoad;
//         this.set = setActionConst;
//         this.inc = incrementActionConst;

//         this.initState = fromJS({n: 0, i: 0});
//     }

//     loadCtrlAction(n) {
//         (dispatch) => {
//             dispatch({
//                 type: this.set,
//                 payload: n
//             });
//         }
//     }

//     loadCtrlReducer(state=this.initState, action) {
//         switch (action.type) {
//             case this.set:
//                 return state.set('n', action.payload);
    
//             case this.inc:
//                 return state.update('i', i => i + 1);
    
//             default: 
//                 return state;
//         }
//     }

//     dispatchLoadInc(dispatch) {
//         return dispatch({
//             type: this.inc
//         });
//     }
// }

export default simpleLoadCtrl;

// const simpleLoadCtrl = (nItemsToLoad, setActionConst = 'LOADER_SET', incrementActionConst = 'LOADER_INC') => {
//     this.a;
// }


// export const fetchCtrl = n => (dispatch) => {
//     dispatch({
//         type: consts.FETCH_CTRL_SET_NUMBER,
//         payload: n
//     });
// }

// export default simpleLoadCtrl;


// const initState = fromJS({n: 0, i: 0});

// export const reducer = (state=initState, action) => {
//     switch (action.type) {
//         case FETCH_CTRL_SET_NUMBER:
//             return state.set('n', action.payload);

//         case FETCH_CTRL_INCREMENT:
//             return state.update('i', i => i + 1);

//         default: 
//             return state;
//     }
// };

// export default fetchCtrl;