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

const getProp = filterPropAccessorFor ()

const reduceSelectables = (getPropFor) => {

    const filterName = 'city';  // this in a map or directly in callback as map with a dynamic getProp
    const getProp = getPropFor (filterName);

    const bucketReducer = (bucket) => (prev, curr) => {
        const propValue = getProp (curr);
                                                                                        // bug('curr', curr, propValue)
        // if (indexIsUndefined (propValue)) {
            bucket[propValue] = bucket[propValue] ||
                // (prev.index[curr.id] = propValue) && prev.list.push (curr) && propValue;
                prev.push (propValue) && propValue;
        // }

        return prev;
    };

    // return bucketReducer ({});

    return R.reduce (bucketReducer ({}), []);

};

const getSelectableFilters = createSelector (
    getRichJobData,
    getFilter,

    (richJobData, filter) => {
        const filterPropAccessor = filterPropAccessorFor (filter);
        const getProp = filterPropAccessor.getProp;

        const filterName = 'city';  // this in a map or directly in callback as map with a dynamic getProp

        // const reduce = reduceSelectables (getProp);

        // const selectables = reduce (richJobData);

        // bug ('+++ filter, richJobData, selectables', filter, richJobData, selectables )

        const notSelectablesIndex = {
            ...makeIndex (filter[filterName].sel, 1),
            ...makeIndex (filter[filterName].excl, 1)
        };

        const filterPredicateWith = (notSelectablesIndex) => (elem) => {
            return !notSelectablesIndex[elem];
        };

        // const filterPredicate = filterPredicateWith (notSelectablesIndex);
        // const filteredS = R.filter (filterPredicate, selectables);


        const fi2 = R.pipe (
            // R.reduce (reduceSelectables (getProp), []),
            // R.filter (filterPredicate)
            reduceSelectables (getProp),
            R.filter (filterPredicateWith (notSelectablesIndex))
        )

        const fi3 = fi2 (richJobData);
        // bug ('+++ filteredS', filteredS);
        bug ('+++ fi3', fi3);

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

