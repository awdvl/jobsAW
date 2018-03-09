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

// const asArray = (value) => Array.isArray(value) ? value: [value];
// generic 
const getByPropValueOf = R.curry((obj, getProp, item) => obj[getProp (item)]);
const propIsUndefinedIn = R.curry((obj, prop) => obj[prop] === undefined);

const wrapInArray = (value) => [value];


const reduceIndexed = R.addIndex(R.reduce);

/**
 *  @param ary {Array} -  the array for which the index will be made
 *  @param i {Number} -  array index from which on the index will be added  -  default: 0 (new index)
 */
const makeIndex = (ary, i = 0) => (
        reduceIndexed ( (acc, value, index) => {
            acc[value] = index + i;
            return acc;
        }, 
        {}

    ) (ary, i));



const makePropAccessFor = R.curry((filterState, type, filterName) =>
    (filterState[type].get(filterName) || filterName));


// this better as transform
const transformSortProps = (filterState, filteredRecords) => {
                                                            // bug('+++++ filterState', filterState)
                                                            // bug('++ filterState.__order', filterState.__order)
                                                            // bug('++ filterState.city', filterState.city)
    const makePropAccess = makePropAccessFor (filterState);
    const getPropName = makePropAccess ('__pointToPath');

    const getPropNameMapped = R.pipe (
        getPropName, 
        makePropAccess ('__mapToPath')
    );

    const getSortOrder = (filter) => filter.sortRest === true ?
            !R.isEmpty (filter.sortOrder) ? filter.sortOrder : undefined :
            filter.sortRest;


    const sortSamples = (filter, sortFilterProps, samples) => {
                                                                        // bug('** filter.sortRest',filter.sortRest)
        const getValueFromIndexBy = R.pipe (
            R.prop, 
            getByPropValueOf (samples.index)
        );

        const mapAsFilterValue = R.map ( getValueFromIndexBy('id') );


        // multi sort for the extracted items
        const multiSortFor = R.pipe (getSortOrder, sortFilterProps, wrapInArray, multiSort)
        const multiSorted = multiSortFor (filter);

        const sortSamplesFor = R.pipe (multiSorted, mapAsFilterValue);
        const sortedSamples = sortSamplesFor (samples.list);
        
                                                                        // bug('** sortedSamples', sortedSamples)
        return sortedSamples;

    };

    //  for more elements, push them into an array of arrays and transform the map in multiSort to a
    //      reduce to apply the different subsorts to the first acc array layer!!
    const getSortedFilterProps = R.curry((filterName, sortOrder) => {
        // default in function not in argument, as function is curried
        sortOrder = sortOrder || [filterName];

        let preparedProp;
                                                // bug('getSortedFilterProps::filterName, sortOrder', filterName, sortOrder)
        if (sortOrder[0] === 'text') {
            preparedProp = ['text', getPropName (filterName)];
                                                    // bug('text filter.sortOrder preparedProp ', preparedProp)
        // e.g. 'pop'
        } else if (!R.isEmpty(sortOrder) && sortOrder[0] !== 'DSC') {
            preparedProp = getPropNameMapped (sortOrder[0]);

        // this only fallback                                            
        } else {
            preparedProp = getPropNameMapped (filterName);
                                                    // bug('with filter.sortOrder preparedProp ', preparedProp)
        }

        if (R.contains ('DSC', sortOrder)) {
            preparedProp.push('DSC');
        }
    
        return preparedProp;
    });

    // -->> possible also for R.path with automatic switch
    // const getPropFor = filterName => obj => R.prop (filterName, obj);
    const getPropFor = R.prop;

    
    const reduceRestToSamples = (getProp, indexIsUndefined) => {

        const bucketReducer = (bucket) => (prev, curr) => {
            const propValue = getProp (curr);

            if (indexIsUndefined (propValue)) {
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
                                    // bug('>>> transformSortProps::filterProps filterName', filterName, filter);
                                    //             bug('>> this', filter.sel, filter.sortByOrder)
        if (filter.sel && !filter.sortByOrder) {
            let selIndex = makeIndex (filter.sel);
                                                                                // bug('** selIndex A', selIndex)
            preparedProp = [ getPropNameMapped (filterName) ];

            if (filter.sortRest) {
                const getProp = R.compose (getPropFor, getPropNameMapped);

                const getSamplesFromRest = reduceRestToSamples (
                    getProp (filterName), 
                    propIsUndefinedIn (selIndex)
                );
                
                const sortedSamples = sortSamples (
                    filter, 
                    getSortedFilterProps (filterName), 
                    getSamplesFromRest (filteredRecords)
                );
                                                                        // bug('** sortedSamples', sortedSamples)
                selIndex = {
                    ...selIndex, 
                    ...makeIndex (sortedSamples, filter.sel.length)
                };
                
            }
                                                                        // bug('** selIndexTot', selIndex)
            preparedProp.push(selIndex);


        } else if (!R.isEmpty(filter.sortOrder) && filter.sortByOrder) {
                                                        // bug('sortByOrder -> filter.sortOrder', filter.sortOrder)
            preparedProp = getSortedFilterProps (filterName, filter.sortOrder);
        }
                                                                            // bug('>>> preparedProp', preparedProp)
        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default transformSortProps;