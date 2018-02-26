import R from 'ramda';
import bug from '../../_libs/bug';

// const citySel = ['city', {
//     S: 0,
//     M: 1,
//     // F: 2
// }];

// sel: [],
// sortOrder: [],
// sortByOrder: false,
// inclRest: false,
// sortRest: true,
// excl: []


const reduceIndexed = R.addIndex(R.reduce);
const makeIndex = (ary) => reduceIndexed ( (acc, value, index) => {
    acc[value] = index;
    return acc;
}, {})(ary);

const makePropAccessFor = (filterState) => (type) => (filterName) =>
    (filterState[type].get(filterName) || filterName);


// this better as transform
const transformSortProps = (filterState) => {
                                                            // bug('+++++ filterState', filterState)
                                                            // bug('++ filterState.__order', filterState.__order)
                                                            // bug('++ filterState.city', filterState.city)
    const makePropAccess = makePropAccessFor(filterState);

    const getPropName = makePropAccess('__pointToPath');
    const getPropAccess = makePropAccess('__mapToPath');

    const getPropNameMapped = R.pipe (getPropName, getPropAccess)
    // const makePropAccess = (type) => (filterState, filterName) =>
    //         (filterState[type].get(filterName) || filterName);
        
    // const getPropName = makePropAccess('__pointToPath');
    // const getPropAccess = makePropAccess('__mapToPath');
    
    // const getPropAccess = (filterState, filterName) =>
    //     (filterState.__mapToPath.get(filterName) || filterName);
    
    const filterProps = filterState.__order.map((filterName) => {
        const filter = filterState[filterName];
        let preparedProp = [];
                                    bug('>>> transformSortProps::filterProps filterName', filterName, filter);
                                                bug('>> this', filter.sel, filter.sortByOrder)
        if (filter.sel && !filter.sortByOrder) {
            // preparedProp = [filterName];
            // preparedProp = [filterState.__mapToPath.get(filterName) || filterName];
            // preparedProp = [ getPropAccess (filterState, filterName) ];
            // preparedProp = [ getPropAccess (filterState, getPropName(filterState, filterName)) ];
            // preparedProp = [ getPropAccess (getPropName (filterName)) ];
            preparedProp = [ getPropNameMapped (filterName) ];

            // -->> to push also sortOrder, sortRest, if inclRest
            const selIndex = makeIndex (filter.sel);
                                                                                bug('>>> selIndex', selIndex)
            preparedProp.push(selIndex);

        // ->> this currently a special case for a one element array with 'text' 
        //      that transfroms to prop of ['text', filtername] -> abstract 
        //  for more elements, push them into an array of arrays and transform the map in multiSort to a
        //      reduce to apply the different subsorts to the first acc array layer!!
        } else if (!R.isEmpty(filter.sortOrder) && filter.sortByOrder) {
                                                        bug('sortByOrder -> filter.sortOrder', filter.sortOrder)
            if (filter.sortOrder[0] === 'text') {
                // preparedProp = [filter.sortOrder[0], getPropAccess (filterState, filterName)];
                // preparedProp = [filter.sortOrder[0], getPropName (filterState, filterName)];
                preparedProp = [filter.sortOrder[0], getPropName (filterName)];

            } else {
                preparedProp = getPropNameMapped (filterName);
            }

        }
                                                                            bug('>>> preparedProp', preparedProp)
        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default transformSortProps;