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


    // here R.prop has to be changeable to R.path, if filterName would be an array (test, if not city)
    const getAllRestOccurences = (filter, filterName, selIndex) => {
        // const bucket = {};
                                                        // bug('======= getAllRestOccurences', filter, filterName)
        const occurences = filteredRecords.reduce((acc, record) => {
            const propValue = R.prop (filterName, record); 

            // not in sel array
            if (selIndex[propValue] === undefined) {
                acc.bucket[propValue] = acc.bucket[propValue] || 
                    (acc.index[record.id] = propValue) && acc.list.push (record) && propValue;
            }
                                                                            // bug('record', record, propValue)
            return acc;
        // }, {index: {}, list: []});
        }, {index: {}, list: [], bucket: {}});
                                                                            bug('== occurences', occurences)
        return occurences;
    };
    

    const getSortOrder = (filter) => filter.sortRest === true ?
            !R.isEmpty (filter.sortOrder) ? filter.sortOrder : undefined :
            filter.sortRest;


    // const preSort = (filterName, filter, otherOptions) => {
    //                                                                     bug('** filter.sortRest',filter.sortRest)
    //     const props = [prepareProp(filterName, getSortOrder(filter))];
    //                                                                     bug('** props for sorted', props)
    //     const sortedList = multiSort(props, otherOptions.list);
    //                                         bug('** sortedList', sortedList, otherOptions.index, sortedList[0].id)

    //     const sorted = sortedList.map(item => otherOptions.index[item.id]);
    //                                                                     bug('** sorted', sorted)

    //     // FP version
    //     const getIndexValues = (index) => (item) => index[item.id];


    //     const mapForIndex = R.map ( getIndexValues (otherOptions.index));

    //     const sortedFP = mapForIndex (sortedList);

    //     const sortPipe = R.pipe(multiSort, mapForIndex);
    //     const sortedFP2 = sortPipe(props, otherOptions.list);


    //     const sortPipe3 = R.pipe(multiSort(props), mapForIndex);
    //     const sortedFP3 = sortPipe3(otherOptions.list);


    //     const getProps = R.curry ((prepareProp, filterName, sortOrder) => [prepareProp(filterName, sortOrder)]);

    //     const sortByPropsLoader = R.pipe(getProps, multiSort);
    //     const sortByPropsLoaded = sortByPropsLoader(prepareProp, filterName, getSortOrder(filter));
        
    //     const sortPipe4 = R.pipe(sortByPropsLoaded, mapForIndex);
    //     const sortedFP4 = sortPipe4(otherOptions.list);
    //                                                                     bug('** sortedFP', sortedFP)
    //                                                                     bug('** sortedFP2', sortedFP2)
    //                                                                     bug('** sortedFP3', sortedFP3)
    //                                                                     bug('** sortedFP4', sortedFP4)
    //     return sorted;

    // };

    const preSort = (filterName, filter, otherOptions) => {
                                                                        bug('** filter.sortRest',filter.sortRest)
        // const props = [prepareProp(filterName, getSortOrder(filter))];
        //                                                                 bug('** props for sorted', props)
        // const sortedList = multiSort(props, otherOptions.list);
        //                                     bug('** sortedList', sortedList, otherOptions.index, sortedList[0].id)

        // const sorted = sortedList.map(item => otherOptions.index[item.id]);
        //                                                                 bug('** sorted', sorted)

        // FP version
        const getIndexValues = (index) => (item) => index[item.id];


        const mapForIndex = R.map ( getIndexValues (otherOptions.index));

        // const sortedFP = mapForIndex (sortedList);

        // const sortPipe = R.pipe(multiSort, mapForIndex);
        // const sortedFP2 = sortPipe(props, otherOptions.list);


        // const sortPipe3 = R.pipe(multiSort(props), mapForIndex);
        // const sortedFP3 = sortPipe3(otherOptions.list);

        const preparePropFor = (filterName) => (sortOrder) => prepareProp(filterName, sortOrder);
        
        const getPropForFilter = preparePropFor(filterName);

        const wrapInArray = (propForFilter) => [propForFilter];
        // const getProps2 = (sortOrder) => [getPropForFilter(sortOrder)];
        // const getProps2 = (sortOrder) => [prepareProp(filterName, sortOrder)];
                                                            // bug('** getProps2', getProps2(getSortOrder(filter)))

        // const loader = R.pipe(getSortOrder, getProps2)
                                                            // bug('** loaded', loader(filter));
        const loader = R.pipe(getSortOrder, getPropForFilter, wrapInArray, multiSort)
        // const loader = R.pipe(getSortOrder, getProps2, multiSort)
        const loaded = loader(filter);

        const sortPipe5 = R.pipe(loaded, mapForIndex);
        const sortedFP5 = sortPipe5(otherOptions.list);
        

        const getProps = R.curry ((prepareProp, filterName, sortOrder) => [prepareProp(filterName, sortOrder)]);

        const sortByPropsLoader = R.pipe(getProps, multiSort);
        const sortByPropsLoaded = sortByPropsLoader(prepareProp, filterName, getSortOrder(filter));
        
        const sortPipe4 = R.pipe(sortByPropsLoaded, mapForIndex);
        const sortedFP4 = sortPipe4(otherOptions.list);
                                                                        // bug('** sortedFP', sortedFP)
                                                                        // bug('** sortedFP2', sortedFP2)
                                                                        // bug('** sortedFP3', sortedFP3)
                                                                        bug('** sortedFP4', sortedFP4)
                                                                        bug('** sortedFP5', sortedFP5)
        return sortedFP4;

    };

    //  for more elements, push them into an array of arrays and transform the map in multiSort to a
    //      reduce to apply the different subsorts to the first acc array layer!!
    const prepareProp = (filterName, sortOrder = [filterName]) => {
        let preparedProp;
                                                bug('prepareProp::filterName, sortOrder', filterName, sortOrder)
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
    }

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
                const allOtherValues = getAllRestOccurences(filter, getPropNameMapped(filterName), selIndex)

                                                                    bug('** allOtherValues', allOtherValues)
                const getProp = getPropFor (getPropNameMapped(filterName));
                const indexIsUndefined = isUndefinedFor (selIndex);
                                                                         
                // const rest = getRest(getProp, indexIsUndefined, filteredRecords);
                const getRest = getRestReducer(getProp, indexIsUndefined)

                const rest = getRest(filteredRecords);
                                                                    bug('** rest', rest)

                const sorted = preSort(filterName, filter, allOtherValues);
                                                                        // bug('ssorted', sorted)
                selIndex = makeIndex (sorted, selIndex, filter.sel.length);
                                                                        bug('>>>>> selIndex B', selIndex)
            }

            preparedProp.push(selIndex);


        } else if (!R.isEmpty(filter.sortOrder) && filter.sortByOrder) {
                                                        bug('sortByOrder -> filter.sortOrder', filter.sortOrder)
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