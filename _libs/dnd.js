
import bug from './bug';

export const findElemFor = (elemOrder) => (elem) => elemOrder.findIndex (value => value === elem);

// export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env, type}) => (elem, atIndex) => {
// export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env, type}) => (elem, atIndex, newEnv) => {
// export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, setMovingFromZone, env, type}) => 
//     (elem, atIndex, newEnv) => {
//         const index = findElemFor (elemOrder)(elem);
//                                 // bug('dnd.js:: *** elemOrder, elem, index, atIndex', elemOrder, elem, index, atIndex)
//         // bug('*** dnd.js::moveElemFor - env, newEnv, elemOrder, index, atIndex', env, newEnv, elemOrder, index, atIndex)
//         bug('*** dnd.js::moveElemFor - env, newEnv, index, atIndex, type', env, newEnv, index, atIndex, type)
                                                        
//         if (newEnv) {
//             if (Array.isArray(newEnv)) {
//                 env = newEnv;

//             } else {
//                 env = [env, newEnv];
//             }
//         }
                                                        
//         updateOrder (
//             elem, { 
//                 index,
//                 atIndex
//             }, env, type
//         );

//         if (setMovingFromZone && newEnv) {
//             setMovingFromZone (newEnv);
//         }

//         if (setIsMoving) {
//             setIsMoving (true);
//         }
//     };

export const moveElemFor2 = (updateOrder, {setIsMoving, setMovingFromZone, type}) => 
    // (elemList, elem, atIndex, env, newEnv) => {
    (elemList, elem, atIndex, env) => {
        bug('*** dnd.js::moveElemFor2 - elemList', elemList)
        const index = findElemFor (elemList)(elem);
                                // bug('dnd.js:: *** elemList, elem, index, atIndex', elemList, elem, index, atIndex)
        bug('*** dnd.js::moveElemFor2 - env, newEnv, elemList, index, atIndex', env, elemList, index, atIndex)
                                                        
        // if (newEnv) {
        //     if (Array.isArray(newEnv)) {
        //         env = newEnv;

        //     } else {
        //         env = [env, newEnv];
        //     }
        // }
                                                        
        updateOrder (
            elem, 
            { index, atIndex }, 
            env, 
            type,
        );

        // if (setMovingFromZone && newEnv) {
        //     setMovingFromZone (newEnv);
        // }
        if (env && env[1]) {
            setMovingFromZone (env[1]);
        }

        if (setIsMoving) {
            setIsMoving (true);
        }
    };