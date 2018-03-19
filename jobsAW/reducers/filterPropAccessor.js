import R from 'ramda';

const makePropAccessFor = R.curry ((filterState, type, filterName) =>
    (filterState[type].get (filterName) || filterName));

// getPropFor -->> possible also for R.path with automatic switch
// const getPropFor = filterName => obj => R.prop (filterName, obj);
const filterPropAccessor = (filterState, getPropFor = R.prop) => {
    const makePropAccess = makePropAccessFor (filterState);
    const getPropName = makePropAccess ('__pointToPath');
    
    const getPropNameMapped = R.pipe (
        getPropName, 
        makePropAccess ('__mapToPath')
    );
    
    const getProp = R.compose (getPropFor, getPropNameMapped);

    return {
        getPropName,
        getPropNameMapped,
        getProp,
    };
};

export default filterPropAccessor;
