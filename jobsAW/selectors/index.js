import { createSelector } from 'reselect';
import R from 'ramda';
import bug from '../../_libs/bug';

// import getRichJobData from './getRichJobData';
import { getRichJobData } from './getRichJobData';

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

// var byGrade = R.groupBy((elem) => {
//     var score = student.score;
//     return score < 65 ? 'F' :
//            score < 70 ? 'D' :
//            score < 80 ? 'C' :
//            score < 90 ? 'B' : 'A';
// });


const getCity = R.prop('city');
// const otherProp = '_';

// const groupByCities = selectedProps => R.groupBy((elem) => {
//     const key = getCity(elem);

//     return selectedProps.includes(key) ? 
//         key : otherProp
// });
const shortGroup = R.groupBy(getCity);

// const groupByCities = selectedProps => R.groupBy((elem) => {
//     const key = getCity(elem);

//     return selectedProps.includes(key) ? 
//         key : otherProp
// });

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

const getSelectedCities = (state) => state.ui.filter.city.sel;


export const getJobData = createSelector(
    getRichJobData,
    getSelectedCities,

    (richJobData, selectedCities) => {
                                                                        bug('selectors::richJobData', richJobData)

            // const grouped = groupIt(richJobData)
            // bug('grouped', grouped)

            const shortGrouped = shortGroup(richJobData);
            bug('shortGrouped', shortGrouped)

            // const shortGroupedAndFiltered = filterSelectedCities(shortGrouped);
            const shortGroupedAndFiltered = pickSelectedCities(shortGrouped);
            bug('shortGroupedAndFiltered', shortGroupedAndFiltered)

        // inBucket(richJobData, selectedCities, elemKey);
        // inBucket(richJobData, selectedCities, elemKeyFn);
        inBucket(richJobData, selectedCities, getElemByKey(elemKey));

        const filteredJobData = richJobData.filter((record) => {
                                                                        bug('record', record.city, selectedCities)
            return selectedCities.includes(record.city);
            // return true;
        });
                                                                bug('selectors::filteredJobData', filteredJobData)


                                                             
                // var numbers = [1, 2, 3, 4];
                // var transducer = R.compose(R.map(R.add(1)), R.take(2));
                // var tRes = R.transduce(transducer, R.flip(R.append), [], numbers);

                // bug('tRes', tRes)

                                                                
        return filteredJobData;
        // return richJobData;
    }
);

// export const getJobData = getRichJobData;
