
import bug from './bug';

export const findElemFor = (elemOrder) => (elem) => elemOrder.findIndex (value => value === elem);

// export const moveElemFor = (elemOrder, updateOrder, setIsMoving) => (elem, atIndex) => {
export const moveElemFor = (elemOrder, updateOrder, {setIsMoving, env}) => (elem, atIndex) => {
    const index = findElemFor (elemOrder)(elem);
                            // bug('dnd.js:: *** elemOrder, elem, index, atIndex', elemOrder, elem, index, atIndex)
    // updateOrder (elem, { 
    //     index,
    //     atIndex,
    // });
    updateOrder (elem, { 
        index,
        atIndex
    }, env);

    if (setIsMoving) {
        setIsMoving (true);
    }
};