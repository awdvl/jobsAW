import { createSelector } from 'reselect';
import R from 'ramda';
import bug from '../../_libs/bug';

import { getRichJobData } from './getRichJobData';
import { getPredicateCity, getPredicateJobType } from './getFilterPredicates';

import { filterByPredicates } from './filterData';
import { groupBySelection, flatten } from './groupData';

import transformSortProps from './transformSortProps';
import multiSort from './multiSort';

// const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);

                                                                bug('selectors::getRichJobData', getRichJobData)
// const selectedCities = ['M', 'S']
// const pickSelectedCities = R.pick(selectedCities);


const getSelectedCities = (state) => state.ui.filter.city.sel;
const getSelectedJobType = (state) => state.ui.filter.jobType.sel;
const getSelectedCompIndy = (state) => state.ui.filter.compIndy.sel;

const getFilters = (state) => state.ui.filter;
// const getFilters = (state) => {
//             bug('----->>> filters state', state);bug('----->>> filters state2', JSON.stringify(state))
//     return state.ui.filter;
// }

export const getJobData = createSelector(
    getRichJobData,
    getFilters,

    getSelectedCities,
    getSelectedJobType,
    getSelectedCompIndy,

    getPredicateCity,
    getPredicateJobType,

    (
        richJobData,
        filters,

        selectedCities, 
        selectedJobType, 
        selectedCompIndy, 

        predicateCity, 
        predicateJobType
    ) => {
                                                                    bug('------------------------- selectors ---')
                                                                    bug('selectors::richJobData', richJobData)
                                                                    bug('selectedCities', selectedCities)
                                                                    bug('selectedJobType', selectedJobType)
                                                                    bug('selectedCompIndy', selectedCompIndy)
        if (!R.isEmpty(richJobData)) {

            const predicates = [
                predicateCity,
                predicateJobType
                
            ];

            // basic predicate filtering
            const multiFiltered = filterByPredicates(predicates, richJobData);
            bug('multiFiltered', multiFiltered)

            const sortProps = transformSortProps(filters, multiFiltered);
            bug('sortProps', sortProps)
            
            const multiSorted = multiSort(sortProps, multiFiltered);
            bug('multiSorted', multiSorted)

            // ===== group on first layer
            // const groupBySelectionCity = groupBySelection('city', selectedCities)
            // const groupedBySelectionCity = groupBySelectionCity(multiFiltered);
            // bug('==== groupedBySelectionCity', groupedBySelectionCity)

            // const flattened = flatten(selectedCities, groupedBySelectionCity);
            // bug('==== flattened', flattened)



            // view-in
            bug('============ mf')  // this is the ungrouped, unsorted list
            multiFiltered.map(record => bug(
                'Record type, indy, emply', 
                record.id, record.text.city, record.type, record.param.indy, record.param.emply, 
                // record.toString(), JSON.stringify(record.text), JSON.stringify(record.param)
            ))
            bug('============')

            bug('============ multiSorted')  // this is the multi sorted
            multiSorted.map(record => bug('Record type, indy, emply', record.id, 
                    record.text.city, record.type, record.param.indy, record.param.emply))
            bug('============')

            // bug('============ flattened')  // this is the grouped list
            // flattened.map(record => bug('Record', record.id, record.text.city, record.type, record.param.indy))
            // bug('============')

                                                             
                // var numbers = [1, 2, 3, 4];
                // var transducer = R.compose(R.map(R.add(1)), R.take(2));
                // var tRes = R.transduce(transducer, R.flip(R.append), [], numbers);

                // bug('tRes', tRes)

            return multiSorted;
            // return multiFiltered;

        }
                       
        return [];

    }
);

// export const getJobData = getRichJobData;
