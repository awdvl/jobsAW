import { Record } from 'immutable';

const FilterCityRecord = Record({
    sel: [],
    sortOrder: [],
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: []
});

const FilterCity = FilterCityRecord;

// class FilterCity extends FilterCityRecord {

// }

export default FilterCity;