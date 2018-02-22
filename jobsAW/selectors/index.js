import { createSelector } from 'reselect';
import R from 'ramda';
import bug from '../../_libs/bug';

import { getRichJobData } from './getRichJobData';
import { getPredicateCity, getPredicateJobType } from './getFilterPredicates';

import { filterByPredicates } from './filterData';
import { groupBySelection, flatten } from './groupData';

// const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);

                                                                bug('selectors::getRichJobData', getRichJobData)
// const selectedCities = ['M', 'S']
// const pickSelectedCities = R.pick(selectedCities);


const getSelectedCities = (state) => state.ui.filter.city.sel;
const getSelectedJobType = (state) => state.ui.filter.jobType.sel;


export const getJobData = createSelector(
    getRichJobData,
    getSelectedCities,
    getSelectedJobType,

    getPredicateCity,
    getPredicateJobType,

    (richJobData, selectedCities, selectedJobType, predicateCity, predicateJobType) => {
                                                                    bug('------------------------- selectors ---')
                                                                    bug('selectors::richJobData', richJobData)
                                                                    bug('selectedCities', selectedCities)
                                                                    bug('selectedJobType', selectedJobType)
        if (!R.isEmpty(richJobData)) {

            const predicates = [
                predicateCity,
                predicateJobType
                
            ];

            const multiFiltered = filterByPredicates(predicates, richJobData);
            bug('multiFiltered', multiFiltered)


            // ===== 
            const groupBySelectionCity = groupBySelection('city', selectedCities)
            const groupedBySelectionCity = groupBySelectionCity(multiFiltered);
            bug('==== groupedBySelectionCity', groupedBySelectionCity)

            const flattened = flatten(selectedCities, groupedBySelectionCity);
            bug('==== flattened', flattened)



            bug('============ mf')
            multiFiltered.map(record => bug('Record', record.id, record.text.city, record.type))
            bug('============')

            bug('============ flattened')
            flattened.map(record => bug('Record', record.id, record.text.city, record.type, record.param.industry))
            bug('============')

                                                             
                // var numbers = [1, 2, 3, 4];
                // var transducer = R.compose(R.map(R.add(1)), R.take(2));
                // var tRes = R.transduce(transducer, R.flip(R.append), [], numbers);

                // bug('tRes', tRes)

            return multiFiltered;

        }
                       
        return [];

    }
);

// export const getJobData = getRichJobData;
