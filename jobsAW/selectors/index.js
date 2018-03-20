import { createSelector } from 'reselect';
import R, { sort } from 'ramda';
import bug from '../../_libs/bug';

import { getRichJobData, getLoc } from './getRichJobData';
import { getPredicateCity, getPredicateJobType } from './getFilterPredicates';
import { extractAll } from './filterSelectables';

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


import { filterTypes } from '../constants/filter';

// const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);



// const extractSelectables = (filterNames, filters, data) => {
const extractSelectables = (filters, data) => {
                                                                    // bug ('*** extractSelectables filters ', filters);
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

    // const filterName = 'jobType';
//     const filterName = 'compEmply';
// bug('+++ selector getNotSelectablesIndex', getNotSelectablesIndex (filters[filterName]));
// bug('+++ --', filterPropAccessorFor (filters).getPropName (filterName))
// bug('+++ --', filterPropAccessorFor (filters).getPropNameMapped ('emply'))

    const filterPredicateWith = (notSelectablesIndex) => 
        (elem) => !notSelectablesIndex[elem];

    const uniqueReducer = (filters, filterName) => 
        bucketReducer (filterPropAccessorFor (filters).getProp (filterName), {});

    const selectablesPredicate = (filters, filterName) => 
        R.compose (filterPredicateWith, getNotSelectablesIndex) (filters[filterName]);

    const mapper = (filters) => (filterName) => 
        R.pipe (
            R.reduce (uniqueReducer (filters, filterName), []),
            // R.filter (selectablesPredicate (filters, filterName))
        );

    const xmap = R.pipe (
        R.map (R.applyTo (filters, mapper)),
        R.map (R.applyTo (data))
    );

    return xmap;
    // const xmap2 = xmap (filterNames);
    //                                                                     bug ('*** extractSelectables xmap2', xmap2);
                                                                
    // return xmap2;
};

const getSelectableFilters = createSelector (
    getRichJobData,
    getFilter,

    (richJobData, filter) => {
        
        // const fi4 = extractSelectables (['city'], filter, richJobData);
        // // // const fi4 = fi4p (richJobData);
        // bug ('+++ fi4', fi4);

        const fi5 = extractAll (filter, richJobData);
        // const fi5 = extractSelectables (filter, richJobData);
        // const fi5i = fi5 (['city']);
        // const fi5i = fi5 (['jobType']);
        // const fi5i = fi5 (['compEmply']);
        const fi5i = fi5 (filterTypes);

        bug ('+++ fi5i', fi5i);
        
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

