import R from 'ramda';
import bug from '../../_libs/bug';

import multiSort from './multiSort';


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

// const wrappedInArray = (value) => Array.isArray(value) ? value: [value];

const reduceIndexed = R.addIndex(R.reduce);

/**
 *  @param ary {Array} -  the array for which the index will be made
 *  @param indexObj {Object} -  an index object, to which the index will be added  -  default: {} (new index)
 *  @param i {Number} -  array index from which on the index will be added  -  default: 0 (new index)
 */
const makeIndex = (ary, indexObj = {}, i = 0) => (reduceIndexed ( (acc, value, index) => {
    acc[value] = index + i;
    return acc;
}, indexObj) (ary, indexObj, i));


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

    const getPropNameMapped = R.pipe (getPropName, getPropAccess)



    const getSortOrder = (filter) => filter.sortRest === true ?
            !R.isEmpty (filter.sortOrder) ? filter.sortOrder : undefined :
            filter.sortRest;


    const sortNotSelected = (filter, sortFilterProps, notSelected) => {
                                                                        bug('** filter.sortRest',filter.sortRest)
        // FP version
        // const byId = R.prop('id');  // not in use

        // generic 
        const getViaPropValueOf = (obj) => (getProp) => (item) => obj[getProp (item)];
        const wrapInArray = (value) => [value];

        // map back to filter values using the created rest.index
        const getValueFromIndex = getViaPropValueOf (notSelected.index)

        const getValueFromIndexBy = R.pipe (R.prop, getValueFromIndex);
        const mapAsFilterValue = R.map (getValueFromIndexBy('id'));


        // multi sort for the extracted items
        // const makeProps = getSortedFilterProps(filterName);
        // const multiSortFor = R.pipe(getSortOrder, makeProps, wrapInArray, multiSort)
        const multiSortFor = R.pipe(getSortOrder, sortFilterProps, wrapInArray, multiSort)

        const multiSorted = multiSortFor(filter);

        //
        const sortPipe5 = R.pipe(multiSorted, mapAsFilterValue);

        const sortedFP5 = sortPipe5(notSelected.list);
        
                                                                        bug('** sortedFP5', sortedFP5)
        return sortedFP5;

    };

    //  for more elements, push them into an array of arrays and transform the map in multiSort to a
    //      reduce to apply the different subsorts to the first acc array layer!!
    // const getSortedFilterProps = (filterName, sortOrder = [filterName]) => {
    const getSortedFilterProps = R.curry((filterName, sortOrder) => {
        // default in function not in argument, as function is curried
        sortOrder = sortOrder || [filterName];

        let preparedProp;
                                                bug('getSortedFilterProps::filterName, sortOrder', filterName, sortOrder)
        if (sortOrder[0] === 'text') {
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
    });

    // -->> possible also for R.path with automatic switch
    const getPropFor = filterName => obj => R.prop (filterName, obj);

    const isUndefinedFor = (index) => (prop) => index[prop] === undefined;

    
    const getRestReducer = (getProp, indexIsUndefined) => {

        const bucketReducer = (bucket) => (prev, curr) => {
            const propValue = getProp (curr);

            if (indexIsUndefined(propValue)) {
                bucket[propValue] = bucket[propValue] ||
                    (prev.index[curr.id] = propValue) && prev.list.push (curr) && propValue;
            }

            return prev;
        };

        return R.reduce (bucketReducer ({}), { index:{}, list:[] });

    };

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
                                                                                bug('>>>>> selIndex A', selIndex)
            if (filter.sortRest) {
                // get possible values, sort them here and add to selIndex
                
                const sortFilterProps = getSortedFilterProps(filterName);


                const getProp = getPropFor (getPropNameMapped(filterName));
                const indexIsUndefined = isUndefinedFor (selIndex);
                                                               
                const getNotSelectedRecords = getRestReducer(getProp, indexIsUndefined)

                const notSelectedRecords = getNotSelectedRecords(filteredRecords);
                                                                bug('** notSelectedRecords', notSelectedRecords)
                
                const sorted = sortNotSelected(filter, sortFilterProps, notSelectedRecords);
                                                                        bug('** sorted', sorted)
                selIndex = makeIndex (sorted, selIndex, filter.sel.length);
                                                                        bug('** selIndex B', selIndex)
            }

            preparedProp.push(selIndex);


        } else if (!R.isEmpty(filter.sortOrder) && filter.sortByOrder) {
                                                        bug('sortByOrder -> filter.sortOrder', filter.sortOrder)
            preparedProp = getSortedFilterProps(filterName, filter.sortOrder);
        }
                                                                            bug('>>> preparedProp', preparedProp)
        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default transformSortProps;