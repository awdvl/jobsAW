import R from 'ramda';
import bug from '../../_libs/bug';
import makeIndex from '../../_libs/makeIndex';

import multiSort from './multiSort';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';

import { List, Iterable } from 'immutable';

// sel: [],
// sortOrder: [],
// sortByOrder: false,
// inclRest: false,
// sortRest: true,
// excl: []


// generic 
const getByPropValueOf = R.curry ((obj, getProp, item) => obj[getProp (item)]);
const propIsUndefinedIn = R.curry ((obj, prop) => obj[prop] === undefined);

const wrapInArray = (value) => [value];



// get the start index, whether or not the object is a iterable (List)    
const getSize = (obj) =>
    obj[Iterable.isIterable (obj) ? 'size' : 'length'];

const makePropAccessFor = R.curry ((filterState, type, filterName) =>
    (filterState[type].get (filterName) || filterName));


// this better as transform
const transformSortProps = (filterState, filteredRecords) => {
                                                                        // bug('+++++ filterState', filterState)
    const filterPropAccessor = filterPropAccessorFor (filterState);

    const getPropName = filterPropAccessor.getPropName;
    const getPropNameMapped = filterPropAccessor.getPropNameMapped;
    const getProp = filterPropAccessor.getProp;

    const getSortOrder = (filter) => filter.sortRest === true ?
            !R.isEmpty (filter.sortOrder) ? filter.sortOrder : undefined :
            filter.sortRest;

    const sortSamples = (filter, sortFilterProps, samples) => {
                                                                        // bug('** filter.sortRest',filter.sortRest)
                                            // bug('+++ filter, sortFilterProps, samples', filter, sortFilterProps, samples)
        const getValueFromIndexBy = R.pipe (
            R.prop, 
            getByPropValueOf (samples.index)
        );

        const mapAsFilterValue = R.map ( getValueFromIndexBy ('id') );


        // multi sort for the extracted items
        const multiSortFor = R.pipe (getSortOrder, sortFilterProps, wrapInArray, multiSort)
        const multiSorted = multiSortFor (filter);

        const sortSamplesFor = R.pipe (multiSorted, mapAsFilterValue);
        const sortedSamples = sortSamplesFor (samples.list);
                                                                        // bug('** sortedSamples', sortedSamples)
        return sortedSamples;

    };

    const getSortedFilterProps = R.curry ((filterName, sortOrder) => {
        // default in function not in argument, as function is curried
        sortOrder = sortOrder || List ([filterName]);
                                                        // bug('+++ transformSortProps sortOrder',sortOrder, filterName)
        const firstElem = sortOrder.get (0)
                                                // bug('+++ firstElem, getPRopName', firstElem, getPropName(filterName))
        let preparedProp;
                                                // bug('getSortedFilterProps::filterName, sortOrder', filterName, sortOrder)
        if (firstElem === 'text') {
            preparedProp = ['text', getPropName (filterName)];
                                                    // bug('text filter.sortOrder preparedProp ', preparedProp)
        // e.g. 'pop'
        } else if (!sortOrder.isEmpty () && firstElem !== 'DSC') {
            preparedProp = getPropNameMapped (firstElem);

        // this only fallback                                            
        } else {
            preparedProp = getPropNameMapped (filterName);
                                                    // bug('with filter.sortOrder preparedProp ', preparedProp)
        }
                                                                                    // bug('+++ pr', preparedProp)
        if (sortOrder.includes()) {
            preparedProp.push('DSC');
        }
                                                                    // bug('+++ getSortedFilterProps', preparedProp)
        return preparedProp;
    });

    
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

    const filterProps = filterState.__order.map ((filterName) => {
        const filter = filterState[filterName];
        let preparedProp = [];
                                    // bug('>>> transformSortProps::filterProps filterName', filterName, filter);
                                    //             bug('>> this', filter.sel, filter.sortByOrder)
        if (filter.sel && !filter.sortByOrder) {
            let selIndex = makeIndex (filter.sel);
                                                                // bug('** isIterable', Iterable.isIterable(filter.sel))
                                                                //                 bug('** selIndex A', selIndex)
            preparedProp = [ getPropNameMapped (filterName) ];

            if (filter.sortRest) {
                const getSamplesFromRest = reduceRestToSamples (
                    getProp (filterName), 
                    propIsUndefinedIn (selIndex)
                );
                                                    // bug ('+++ filterName, selIndex', filterName, selIndex)
                                                    // bug('+++  filteredRecords.size', filteredRecords.length)
                                                    // bug ('+++ getSamplesFromRest', getSamplesFromRest (filteredRecords))
                const sortedSamples = sortSamples (
                    filter, 
                    getSortedFilterProps (filterName), 
                    getSamplesFromRest (filteredRecords)
                );
                                                                        // bug('+++ sortedSamples', sortedSamples)
                selIndex = {
                    ...selIndex, 
                    ...makeIndex (sortedSamples, getSize (filter.sel))
                };
                
            }
                                                                        // bug('** selIndexTot', selIndex)
            preparedProp.push(selIndex);


        } else if (!R.isEmpty (filter.sortOrder) && filter.sortByOrder) {
                                                        // bug('sortByOrder -> filter.sortOrder', filter.sortOrder)
            preparedProp = getSortedFilterProps (filterName, filter.sortOrder);
        }
                                                                            bug('>>> preparedProp', preparedProp)
        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default transformSortProps;