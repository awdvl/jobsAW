import { createSelector } from 'reselect';
import R, { sort } from 'ramda';
import bug from '../../_libs/bug';

import { getRichJobData, getLoc } from './getRichJobData';
import { getPredicateCity, getPredicateJobType } from './getFilterPredicates';

import { filterByPredicates } from './filterData';
import { groupBySelection, flatten } from './groupData';

import transformSortProps from './transformSortProps';
import multiSort from './multiSort';

import { getFilter } from '../reducers/filter';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';

// simple tests  -  docs see: https://facebook.github.io/jest/docs/en/using-matchers.html
import expect from 'expect';
import { sortedRestByName, sortedRestByNumber } from './__testData';
import makeIndex from '../../_libs/makeIndex';

// const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);

// const selectedCities = ['M', 'S']
// const pickSelectedCities = R.pick(selectedCities);

// const uniques = R.uniqBy ()

// const getProp = filterPropAccessorFor ()


// const reduceSelectables = (getPropFor) => {

//     const filterName = 'city';  // this in a map or directly in callback as map with a dynamic getProp
//     const getProp = getPropFor (filterName);

//     const bucketReducer = (bucket) => (prev, curr) => {
//         const propValue = getProp (curr);
//                                                                                         // bug('curr', curr, propValue)
//         // if (indexIsUndefined (propValue)) {
//             bucket[propValue] = bucket[propValue] ||
//                 // (prev.index[curr.id] = propValue) && prev.list.push (curr) && propValue;
//                 prev.push (propValue) && propValue;
//         // }

//         return prev;
//     };

//     // return bucketReducer ({});

//     return R.reduce (bucketReducer ({}), []);

// };

// const reduceSelectables = (getPropFor) => {

//     const filterName = 'city';  // this in a map or directly in callback as map with a dynamic getProp
//     const getProp = getPropFor (filterName);

//     const bucketReducer = (getProp, bucket) => (prev, curr) => {
//         const propValue = getProp (curr);
//                                                                                         // bug('curr', curr, propValue)
//         // if (indexIsUndefined (propValue)) {
//             bucket[propValue] = bucket[propValue] ||
//                 // (prev.index[curr.id] = propValue) && prev.list.push (curr) && propValue;
//                 prev.push (propValue) && propValue;
//         // }

//         return prev;
//     };

//     return bucketReducer ({});

//     // return R.reduce (bucketReducer ({}), []);

// };


const extractSelectables = (filterNames, filters, data) => {
    bug ('*** extractSelectables filters ', filters);

    const bucketReducer = (getProp, bucket) => (prev, curr) => {
        const propValue = getProp (curr);
                                                                                        // bug('curr', curr, propValue)
        bucket[propValue] = bucket[propValue] ||
                prev.push (propValue) && propValue;

        return prev;
    };

    const getNotSelectablesIndex = (filter) => ({
        ...makeIndex (filter.sel, 1),
        ...makeIndex (filter.excl, 1)
    });

    const filterPredicateWith = (notSelectablesIndex) => (elem) => {
        return !notSelectablesIndex[elem];
    };


    // const getPropFor = filterPropAccessorFor (filters).getProp;

    // const mapper = (data) => (filterName) => {
    //     const getProp = getPropFor (filterName);

    //     const fi2 = R.pipe (
    //         R.reduce (bucketReducer (getProp, {}), []),
    //         // R.filter (filterPredicate)
    //         // reduceSelectables (getProp),
    //         R.filter (filterPredicateWith (getNotSelectablesIndex (filters[filterName])))
    //     );

    //     return fi2 (data);
    // };

    // const mapper2 = (filterName) => {
    //     const fi2 = R.pipe (
    //         R.reduce (bucketReducer (getPropFor (filterName), {}), []),
    //         // R.filter (filterPredicateWith (getNotSelectablesIndex (filters[filterName])))
    //         R.filter (R.compose (filterPredicateWith, getNotSelectablesIndex) (filters[filterName]))
    //         // R.filter (R.apply (R.pipe (getNotSelectablesIndex, filterPredicateWith), filters[filterName]))
    //     );

    //     return fi2;
    // };

    // const mapper3 = (filters) => (filterName) => {
    //     const fi2 = R.pipe (
    //         R.reduce (bucketReducer (getPropFor (filterName), {}), []),
    //         // R.filter (filterPredicateWith (getNotSelectablesIndex (filters[filterName])))
    //         R.filter (R.compose (filterPredicateWith, getNotSelectablesIndex) (filters[filterName]))
    //     );

    //     return fi2;
    // };

    // const uniqueReducer = (filterName) => {
    //     const getPropFor = filterPropAccessorFor (filters).getProp;
    //     return bucketReducer (getPropFor (filterName), {});
    // };

    // const selectablesPredicate = (filterName) => {
    //     return R.compose (filterPredicateWith, getNotSelectablesIndex) (filters[filterName]);
    // }

    const uniqueReducer = (filters, filterName) => 
        bucketReducer (filterPropAccessorFor (filters).getProp (filterName), {});

    const selectablesPredicate = (filters, filterName) => 
        R.compose (filterPredicateWith, getNotSelectablesIndex) (filters[filterName]);

    const mapper4 = (filters) => (filterName) => 
        R.pipe (
            R.reduce (uniqueReducer (filters, filterName), []),
            R.filter (selectablesPredicate (filters, filterName))
        );

    // const mapper4 = (filterName) => 
    //     R.pipe (
    //         R.reduce (uniqueReducer (filterName), []),
    //         R.filter (selectablesPredicate (filterName))
    //     );

       

    // const map = R.map (mapper (data));
    //                                                     // bug ('*** extractSelectables map ', map);

    // const fmap = map (filterNames);
    //                                                                     bug ('*** extractSelectables fmap ', fmap);
    // const pmap = R.map (mapper2);
    // const pmap2 = pmap (filterNames);
    //                                                                     bug ('*** extractSelectables pmap2', pmap2);

    // const applyTo = (data) => (fx) => fx(data);
    // applyTo (filters)

    // const dmap = R.map (R.applyTo (data))
    // const dmap2 = dmap (pmap2)
    //                                                                     bug ('*** extractSelectables dmap2', dmap2);
    const xmap = R.pipe (
        // R.map (mapper2),
        // R.map (mapper3 (filters)),
        // R.map (R.applyTo (filters, mapper3)),
        R.map (R.applyTo (filters, mapper4)),
        // R.map (mapper4),
        R.map (R.applyTo (data))
    );
    const xmap2 = xmap (filterNames);
                                                                        bug ('*** extractSelectables xmap2', xmap2);
                                                                
    return xmap2;
};

const getSelectableFilters = createSelector (
    getRichJobData,
    getFilter,

    (richJobData, filter) => {
        // const filterPropAccessor = filterPropAccessorFor (filter);
        // const getProp = filterPropAccessor.getProp;

        // const filterName = 'city';  // this in a map or directly in callback as map with a dynamic getProp

        // // const reduce = reduceSelectables (getProp);

        // // const selectables = reduce (richJobData);

        // // bug ('+++ filter, richJobData, selectables', filter, richJobData, selectables )

        // const notSelectablesIndex = {
        //     ...makeIndex (filter[filterName].sel, 1),
        //     ...makeIndex (filter[filterName].excl, 1)
        // };

        // const filterPredicateWith = (notSelectablesIndex) => (elem) => {
        //     return !notSelectablesIndex[elem];
        // };

        // // const filterPredicate = filterPredicateWith (notSelectablesIndex);
        // // const filteredS = R.filter (filterPredicate, selectables);


        // const fi2 = R.pipe (
        //     // R.reduce (reduceSelectables (getProp), []),
        //     // R.filter (filterPredicate)
        //     reduceSelectables (getProp),
        //     R.filter (filterPredicateWith (notSelectablesIndex))
        // )

        // const fi3 = fi2 (richJobData);
        // // bug ('+++ filteredS', filteredS);
        // bug ('+++ fi3', fi3);


        const fi4 = extractSelectables (['city'], filter, richJobData);
        // // const fi4 = fi4p (richJobData);
        bug ('+++ fi4', fi4);

        // reduceRestToUniqueValues (
        //     getProp (filterName), 
        //     propIsUndefinedIn (selIndex)
        // ) (filteredRecords)        
    }

);


// bug ('+++ getSelectableFilters', getSelectableFilters)





// const getSelectedCities = (state) => state.ui.filter.city.sel;
// const getSelectedJobType = (state) => state.ui.filter.jobType.sel;
// const getSelectedCompIndy = (state) => state.ui.filter.compIndy.sel;

// const getFilters = (state) => state.ui.filter;
// const getFilters = (state) => {
//             bug('----->>> filters state', state);bug('----->>> filters state2', JSON.stringify(state))
//     return state.ui.filter;
// }

// export const getJobData = createSelector(
const getJobData = createSelector (
    getRichJobData,
    getFilter,

    getPredicateCity,
    getPredicateJobType,

    (
        richJobData,
        filters,

        predicateCity, 
        predicateJobType
    ) => {
                                                                    // bug('------------------------- selectors ---')
                                                                    // bug('selectors::richJobData', richJobData)
        if (!R.isEmpty (richJobData)) {

            const predicates = [
                predicateCity,
                predicateJobType
            ];

            // basic predicate filtering
            const multiFiltered = filterByPredicates (predicates, richJobData);
                                                                    // bug('multiFiltered', multiFiltered)
            const sortProps = transformSortProps (filters, multiFiltered);
                                                                    // bug('sortProps', sortProps)
            const multiSorted = multiSort (sortProps, multiFiltered);
                                                                    // bug('multiSorted', multiSorted)

            return multiSorted;

        }
                       
        return [];

    }
);

export { getJobData, getLoc, getSelectableFilters };
// export { getJobData, getLoc };

