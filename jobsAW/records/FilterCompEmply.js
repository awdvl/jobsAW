import { Record } from 'immutable';

/** 
 *  sel: []  selected items
 *  sortOrder: []  sort by a predefined order concept, e.g. by name, population, ...
 *  sortByOrder: boolean  true: use the sortOrder,  false: use the order of the sel array
 *  inclRest: boolean  include other items (except excluded values)
 *  sortRest: true/[]  true: same sort order as in sortOrder,  []: define a different sort order
 *  excl: []  excluded items
*/
const FilterCompEmplyRecord = Record({
    sel: [],
    sortOrder: [],
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: []
});

const FilterCompEmply = FilterCompEmplyRecord;

// class FilterCompEmply extends FilterCompEmplyRecord {

// }

export default FilterCompEmply;