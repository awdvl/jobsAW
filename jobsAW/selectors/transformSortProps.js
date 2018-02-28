import R from 'ramda';
import bug from '../../_libs/bug';

import sortByProps, { makeComparatorIx } from './multiSort';

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
const makeIndex = (ary, indexObj = {}, n = 0) => reduceIndexed ( (acc, value, index) => {
    acc[value] = index + n;
    return acc;
}, indexObj)(ary, indexObj, n);

// const makeIndex = (ary) => reduceIndexed ( (acc, value, index) => {
//     acc[value] = index;
//     return acc;
// }, {})(ary);


const makePropAccessFor = (filterState) => (type) => (filterName) =>
    (filterState[type].get(filterName) || filterName);


// this better as transform
const transformSortProps = (filterState, filteredRecords) => {
                                                            // bug('+++++ filterState', filterState)
                                                            // bug('++ filterState.__order', filterState.__order)
                                                            // bug('++ filterState.city', filterState.city)
    const makePropAccess = makePropAccessFor(filterState);

    const getPropName = makePropAccess('__pointToPath');
    const getPropAccess = makePropAccess('__mapToPath');

    const wrappedInArray = (value) => Array.isArray(value) ? value: [value];

    const getPropNameMapped = R.pipe (getPropName, getPropAccess)
    // const getPropNameMapped = R.pipe (getPropName, getPropAccess, wrappedInArray)


    // const getAllRestOccurences = (filter, filterName, selIndex) => {
    //                                                 bug('======= getAllRestOccurences', filter, filterName)
    //     const bucket = {};

    //     const unique = filteredRecords.reduce((acc, record) => {
    //         const propValue = R.prop (filterName, record); 

    //         // not in sel array
    //         if (selIndex[propValue] === undefined) {
    //             bucket[propValue] = bucket[propValue] || acc.push (propValue) && propValue;
                
    //             // acc.push (record);
    //         }
    //                                                                         // bug('record', record, propValue)
    //         return acc;
    //     }, []);
    //                                                                         bug('== unique', unique)
    //     return unique;
    // };
    
    const getAllRestOccurences = (filter, filterName, selIndex) => {
                                                    bug('======= getAllRestOccurences', filter, filterName)
        const bucket = {};

        const unique = filteredRecords.reduce((acc, record) => {
            const propValue = R.prop (filterName, record); 

            // not in sel array
            if (selIndex[propValue] === undefined) {
                bucket[propValue] = bucket[propValue] || 
                    (acc.index[record.id] = propValue) && acc.list.push (record) && propValue;
                
                // acc.push (record);
            }
                                                                            // bug('record', record, propValue)
            return acc;
        }, {index: {}, list: []});
                                                                            bug('== unique', unique)
        return unique;
    };
    
    
    const getSortOrder = (filter) => {
        const order = filter.sortRest === true ?
            !R.isEmpty (filter.sortOrder) ?
                filter.sortOrder:
                undefined:
            filter.sortRest;

        return order;
    };

    const preSort = (filterName, filter, list) => {

                                                                        bug('-- filter.sortRest',filter.sortRest)
        const props = [prepareProp(filterName, getSortOrder(filter))];
        // const props = [filter.sortRest === true ?
        //     prepareProp(filterName): // to adapt
        //     prepareProp(filterName, filter.sortRest)];
                                                                bug('** props for sorted', props)
                                                    bug('** list0', list.list, list.list[0].id, list.list[0].city)
                                                    bug('** list1', list.list, list.list[1].id, list.list[1].city)
        const sortedList = sortByProps(props, list.list);
                                                    bug('** sortedList', sortedList, list.index, sortedList[0].id)

        const sorted = sortedList.map(item => list.index[item.id]);
        // const sorted = R.sort(makeComparatorIx(prop), list);

                                                                            bug('sorted', sorted)

        return sorted;

    };

    // const prepareProp = (filterName, sortOrder) => {
    const prepareProp = (filterName, sortOrder = [filterName]) => {
        let preparedProp;
                                                bug('prepareProp::filterName, sortOrder', filterName, sortOrder)
        if (sortOrder[0] === 'text') {
            // preparedProp = [filter.sortOrder[0], getPropAccess (filterState, filterName)];
            // preparedProp = [filter.sortOrder[0], getPropName (filterState, filterName)];
            preparedProp = [sortOrder[0], getPropName (filterName)];
                                                    bug('text filter.sortOrder preparedProp ', preparedProp)
        // e.g. 'pop'
        } else if (!R.isEmpty(sortOrder) && sortOrder[0] !== 'DSC') {
            preparedProp = getPropNameMapped (sortOrder[0]);

        // this only fallback                                            
        } else {
            preparedProp = getPropNameMapped (filterName);
                                                    bug('with filter.sortOrder preparedProp ', preparedProp)
        }

        if (R.contains ('DSC', sortOrder)) {
            preparedProp.push('DSC');
        }
    
        return preparedProp;
    }

    const filterProps = filterState.__order.map((filterName) => {
        const filter = filterState[filterName];
        let preparedProp = [];
                                    bug('>>> transformSortProps::filterProps filterName', filterName, filter);
                                                bug('>> this', filter.sel, filter.sortByOrder)
        if (filter.sel && !filter.sortByOrder) {
            preparedProp = [ getPropNameMapped (filterName) ];
            // preparedProp = getPropNameMapped (filterName);

            // -->> to push also sortOrder, sortRest, if inclRest
            let selIndex = makeIndex (filter.sel);
                                                                                bug('>>> selIndex', selIndex)
            if (filter.sortRest) {
                // get possible values, sort them here and add to selIndex
                const allOtherValues = getAllRestOccurences(filter, getPropNameMapped(filterName), selIndex)

                bug('allOtherValues', allOtherValues)

                const sorted = preSort(filterName, filter, allOtherValues);
// bug('ssorted', sorted)
                selIndex = makeIndex (sorted, selIndex, filter.sel.length);
                // selIndex = makeIndex (sorted);

                bug('--> selIndex', selIndex)
            }

            preparedProp.push(selIndex);

        // ->> this currently a special case for a one element array with 'text' 
        //      that transfroms to prop of ['text', filtername] -> abstract 
        //  for more elements, push them into an array of arrays and transform the map in multiSort to a
        //      reduce to apply the different subsorts to the first acc array layer!!
        } else if (!R.isEmpty(filter.sortOrder) && filter.sortByOrder) {
                                                        bug('sortByOrder -> filter.sortOrder', filter.sortOrder)
            // if (filter.sortOrder[0] === 'text') {
            //     // preparedProp = [filter.sortOrder[0], getPropAccess (filterState, filterName)];
            //     // preparedProp = [filter.sortOrder[0], getPropName (filterState, filterName)];
            //     preparedProp = [filter.sortOrder[0], getPropName (filterName)];

            // } else {
            //     preparedProp = getPropNameMapped (filterName);
            //                                             bug('with filter.sortOrder preparedProp ', preparedProp)
            // }

            // if (R.contains ('DSC', filter.sortOrder)) {
            //     preparedProp.push('DSC');
            // }

            preparedProp = prepareProp(filterName, filter.sortOrder);

        }
                                                                            bug('>>> preparedProp', preparedProp)
        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default transformSortProps;