import { createSelector } from 'reselect';
import R from 'ramda';
import bug from '../../_libs/bug';

import getRichJobData, { getLoc } from './getRichJobData';
import { 
    getPredicateCity, 
    getPredicateJobType,
    getPredicateCompIndy,
    getPredicateCompEmply,

} from './getFilterPredicates';

import { extractAll } from './filterSelectables';
import transformSortProps from './transformSortProps';
import multiSort from './multiSort';

import { filterTypes } from '../constants/filter';
import { getFilter } from '../reducers/filter';

import makeIndex from '../../_libs/makeIndex';


const getSelectableFilters = createSelector (
    getRichJobData,
    getFilter,

    (richJobData, filter) => extractAll (filter, richJobData) (filterTypes)
);


// --> call getJobData (via fetch.js) only on Modal close!!!
const getJobData = createSelector (
    getRichJobData,
    getFilter,

    getPredicateCity,
    getPredicateJobType,
    getPredicateCompIndy,
    getPredicateCompEmply,

    (
        richJobData,
        filters,

        predicateCity, 
        predicateJobType,
        predicateCompIndy,
        predicateCompEmply,

    ) => {
                                                                // bug('------------------------- selectors ---')
                                                                // bug('selectors::richJobData', richJobData)
                                                    // bug('getRichJobData count', getRichJobData.recomputations())
        if (!R.isEmpty (richJobData)) {

            const predicates = [
                predicateCity,
                predicateJobType,
                predicateCompIndy,
                predicateCompEmply,
            ];

            const multiFiltered = R.filter (R.allPass (predicates), richJobData);
                                                                // bug('>> selectors - multiFiltered', multiFiltered)
            const sortProps = transformSortProps (filters, multiFiltered);
                                                                // bug('>> selectors - sortProps', sortProps)
            const multiSorted = multiSort (sortProps, multiFiltered);
                                                                // bug('>> selectors - multiSorted', multiSorted)

            return multiSorted;

        }
                       
        return [];

    }
);

export { getJobData, getLoc, getSelectableFilters };

