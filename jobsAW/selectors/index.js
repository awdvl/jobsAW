import { createSelector } from 'reselect';
import R from 'ramda';
import bug from '../../_libs/bug';

import { getRichJobData } from './getRichJobData';
import { getPredicateCity, getPredicateJobType } from './getFilterPredicates';

import { filterByPredicates } from './filterData';
import { groupBySelection, flatten } from './groupData';

const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);

                                                                            // bug('selectors::state', state)
                                                                bug('selectors::getRichJobData', getRichJobData)
const elemKey = 'city';
const elemKeyFn = (elem) => elem[elemKey];
const getElemByKey = elemKey => elem => elem[elemKey];

// const inBucket = (dataToProcess, comparison, elemKeyOrFn) => {
//     const filteredJobData = dataToProcess.reduce((buckets, elem) => {
//         const key = typeof elemKeyOrFn === 'string' ? 
//             elem[elemKeyOrFn] :
//             elemKeyOrFn(elem);

//         comparison.includes(key) && arrayEnter(buckets, key).push(elem);
        

//         return buckets;

//     }, {});

//         bug('inBucket::filteredJobData', filteredJobData)
// }


const selectedCities = ['M', 'S']
// const groupIt = groupByCities(selectedCities);

// const filterSelectedCities = R.filter(R.propSatisfies(x => selectedCities.includes(x), elemKey))
const pickSelectedCities = R.pick(selectedCities);

const inBucket = (dataToProcess, comparison, elemKeyOrFn) => {
    const filteredJobData = dataToProcess.reduce((buckets, elem) => {
        // const key = typeof elemKeyOrFn === 'string' ? 
        //     elem[elemKeyOrFn] :
        //     elemKeyOrFn(elem);

        const getItem = R.prop(elemKey)
        const key = getItem(elem)

        comparison.includes(key) && arrayEnter(buckets, key).push(elem);
        

        return buckets;

    }, {});

        bug('inBucket::filteredJobData', filteredJobData)
}


// const compareSelected = (selectedItems, x) => selectedItems.includes(x);
const compareSelected = R.curry((selectedItems, x) => selectedItems.includes(x));

// const compareSelectedWithProp =  R.propSatisfies(compareSelected, itemKey)

// const compareSelected = R.curry((itemKey, selectedItems, data) => selectedItems.includes(x), itemKey);


const filledCompareSelected = compareSelected(['M', 'S'])
const predicateA = R.propSatisfies(filledCompareSelected, 'city');
// const predicateA = R.propEq('city', 'M');
const predicateB = R.propEq('type', 3);
const selectedPredicates = [predicateA, predicateB];

// const multiFilterP = multiFilter(selectedPredicates);
// const multiFilterP = R.filter(R.allPass(selectedPredicates))

// const getCities = (state) => state.ui.filter.city;

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
            // const grouped = groupIt(richJobData)
            // bug('grouped', grouped)

            // const shortGrouped = shortGroup(richJobData);
            // bug('shortGrouped', shortGrouped)

            // // const shortGroupedAndFiltered = filterSelectedCities(shortGrouped);
            // const shortGroupedAndFiltered = pickSelectedCities(shortGrouped);
            // bug('shortGroupedAndFiltered', shortGroupedAndFiltered)



            const predicates = [
                predicateCity,
                predicateJobType
                
            ];
            // const multiFilterP = multiFilter(predicates);
            // const multiFilterP = multiFilter(selectedPredicates);

            // const multiFiltered = multiFilterP(richJobData);
            const multiFiltered = filterByPredicates(predicates, richJobData);
            bug('multiFiltered', multiFiltered)


            // ===== 
            const groupBySelectionCity = groupBySelection('city', selectedCities)
            const groupedBySelectionCity = groupBySelectionCity(multiFiltered);
            bug('==== groupedBySelectionCity', groupedBySelectionCity)

            const flattened = flatten(selectedCities, groupedBySelectionCity);
            bug('==== flattened', flattened)


            // const groupByCity = groupBy('city');

            // const grouped = groupByCity(multiFiltered);
            // bug('grouped', grouped)

            bug('============ mf')
            multiFiltered.map(record => bug('Record', record.id, record.text.city, record.type))
            bug('============')

            bug('============ flattened')
            flattened.map(record => bug('Record', record.id, record.text.city, record.type, record.param.industry))
            bug('============')



        // inBucket(richJobData, selectedCities, elemKey);
        // inBucket(richJobData, selectedCities, elemKeyFn);
        // inBucket(richJobData, selectedCities, getElemByKey(elemKey));

                                                             
                // var numbers = [1, 2, 3, 4];
                // var transducer = R.compose(R.map(R.add(1)), R.take(2));
                // var tRes = R.transduce(transducer, R.flip(R.append), [], numbers);

                // bug('tRes', tRes)

            return multiFiltered;

        }
                       
        return [];

        // const filteredJobData = richJobData.filter((record) => {
        //     // bug('record', record.city, selectedCities)
        //     return selectedCities.includes(record.city);
        //     // return true;
        // });

        // bug('selectors::filteredJobData', filteredJobData)

        // return filteredJobData;
        // // return richJobData;
    }
);

// export const getJobData = getRichJobData;
