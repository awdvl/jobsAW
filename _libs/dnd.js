
import bug from './bug';

export const findElemFor = (elemOrder) => (elem) => elemOrder.findIndex (value => value === elem);

// export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env, type}) => (elem, atIndex) => {
export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env, type}) => (elem, atIndex, newEnv) => {
    const index = findElemFor (elemOrder)(elem);
                            // bug('dnd.js:: *** elemOrder, elem, index, atIndex', elemOrder, elem, index, atIndex)
    if (newEnv) {
        env = [env, newEnv];
    }
                                                    
    updateOrder (
        elem, 
        { 
            index,
            atIndex
        }, 
        env,
        type
    );

    if (setIsMoving) {
        setIsMoving (true);
    }
};