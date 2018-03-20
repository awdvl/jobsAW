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

import { setSelectables } from '../actions/filter';
import { getFilter } from '../reducers/filter';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';

// simple tests  -  docs see: https://facebook.github.io/jest/docs/en/using-matchers.html
import expect from 'expect';
import { sortedRestByName, sortedRestByNumber } from './__testData';
import makeIndex from '../../_libs/makeIndex';

// import { hash } from 'immutable';

import { filterTypes } from '../constants/filter';

// const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);


const getSelectableFilters = createSelector (
    getRichJobData,
    getFilter,

    (richJobData, filter) => {
        

        const fi5 = extractAll (filter, richJobData);
        const fi5i = fi5 (filterTypes);

                                                        bug ('+++ selectors - fi5i', fi5i, fi5i[0]);
        // setSelectables ('city', fi5i[0]);

        return fi5i;
        
    }

);

// --> call getJobData (via fetch.js) only on Modal close!!!
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
                                                                    bug('selectors::richJobData', richJobData)
                                                    // bug('getRichJobData count', getRichJobData.recomputations())
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

