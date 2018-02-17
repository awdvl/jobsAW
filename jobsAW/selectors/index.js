import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

// import getRichJobData from './getRichJobData';
import { getRichJobData } from './getRichJobData';

const arrayEnter = (obj, key) => obj[key] || (obj[key]=[]);

                                                                            // bug('selectors::state', state)
                                                                bug('selectors::getRichJobData', getRichJobData)
const elemKey = 'city';
const elemKeyFn = (elem) => elem[elemKey];
const getElemByKey = elemKey => elem => elem[elemKey];

const inBucket = (dataToProcess, comparison, elemKeyOrFn) => {
    const filteredJobData = dataToProcess.reduce((buckets, elem) => {
        const key = typeof elemKeyOrFn === 'string' ? 
            elem[elemKeyOrFn] :
            elemKeyOrFn(elem);

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
        // inBucket(richJobData, selectedCities, elemKey);
        // inBucket(richJobData, selectedCities, elemKeyFn);
        inBucket(richJobData, selectedCities, getElemByKey(elemKey));

        const filteredJobData = richJobData.filter((record) => {
                                                                        bug('record', record.city, selectedCities)
            return selectedCities.includes(record.city);
            // return true;
        });
                                                                bug('selectors::filteredJobData', filteredJobData)
        return filteredJobData;
        // return richJobData;
    }
);

// export const getJobData = getRichJobData;
