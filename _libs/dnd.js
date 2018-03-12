
export const findElemFor = (elemOrder) => (elem) => elemOrder.findIndex (value => value === elem);

export const moveElemFor = (elemOrder, updateOrder, setIsMoving) => (elem, atIndex) => {
    const index = findElemFor (elemOrder)(elem);
                            // bug('*** elemOrder, elem, index, atIndex', elemOrder, elem, index, atIndex)
    updateOrder (elem, { 
        index,
        atIndex,
    });

    setIsMoving(true);
};