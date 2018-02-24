import { createSelector } from 'reselect';

const possibleFilterProps = ['city', 'jobType', 'compIndy'];

const getFilterProp = (filterProp) => (state) => state.ui.filter[filterProp];

const makeGetFilterProps = (possibleFilterProps) => (state) => {
    const filterProps = possibleFilterProps.reduce ((acc, prop) => {
        return acc[prop] = getFilterProp(prop);
    }, {});

    return filterProps;
};


const getFilterOrder = getFilterProp('order');
const getFilterCities = getFilterProp('city');
const getFilterJobType = getFilterProp('jobType');
const getFilterCompIndy = getFilterProp('compIndy');


// const getSelectedCities = (state) => state.ui.filter.city.sel;
// const getSelectedJobType = (state) => state.ui.filter.jobType.sel;
// const getSelectedCompIndy = (state) => state.ui.filter.compIndy.sel;

// export const getFilterSelection = createSelector (
//     getFilterOrder,
//     getSelectedCities,
//     getSelectedJobType,
//     getSelectedCompIndy,

//     (
//         filterOrder,
//         selectedCities, 
//         selectedJobType, 
//         selectedCompIndy
//     ) => {
//         const filterProps = filterOrder.map((filterProp) => {

//         });

//         return filterProps;
//     }

// );

