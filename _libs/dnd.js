
import bug from './bug';

export const findElemFor = (elemOrder) => (elem) => elemOrder.findIndex (value => value === elem);

// export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env, type}) => (elem, atIndex) => {
// export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env, type}) => (elem, atIndex, newEnv) => {
export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, setMovingFromZone, env, type}) => 
    (elem, atIndex, newEnv) => {
        const index = findElemFor (elemOrder)(elem);
                                // bug('dnd.js:: *** elemOrder, elem, index, atIndex', elemOrder, elem, index, atIndex)
        bug('*** dnd.js::moveElemFor - env, newEnv, elemOrder, index, atIndex', env, newEnv, elemOrder, index, atIndex)
                                                        
        if (newEnv) {
            if (Array.isArray(newEnv)) {
                env = newEnv;

            } else {
                env = [env, newEnv];
            }
        }
                                                        
        updateOrder (
            elem, { 
                index,
                atIndex
            }, env, type
        );

        if (setMovingFromZone && newEnv) {
            setMovingFromZone (newEnv);
        }

        if (setIsMoving) {
            setIsMoving (true);
        }
    };