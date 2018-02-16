import { createSelector } from 'reselect';
import bug from '../../_libs/bug';

// import getRichJobData from './getRichJobData';
import { getRichJobData } from './getRichJobData';

                                                                            // bug('selectors::state', state)
                                                                bug('selectors::getRichJobData', getRichJobData)
// const getSelectedCities = (state) => state.ui.filter.city.sel;
const getSelectedCities = (state) => state.ui.filter;

export const getJobData = createSelector(
    getRichJobData,
    getSelectedCities,

    (richJobData, selectedCities) => {
                                                                        bug('selectors::richJobData', richJobData)
        const filteredJobData = richJobData.filter((record) => {
            bug('record', record.city, selectedCities)  // --->> city is Map!! -> better transform to Record??
            // return selectedCities.includes(record.city);
            return true;
        });
                                                            bug('selectors::filteredJobData', filteredJobData);
        return filteredJobData;
        // return richJobData;
    }
);

// export const getJobData = getRichJobData;
