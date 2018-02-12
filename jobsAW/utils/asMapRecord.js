import { Map, fromJS } from 'immutable';

/**
 * Get a reviver for a Map/(Map...)/Record immutable structure
 * 
 * @param {Class} recordClass  - a Record class definition
 * @param {function} recordCondition  - default: check for an empty string (standard case for a Map/Record)
 */
export const getReviver = (recordClass, recordCondition = key => key !== '') => (key, value) => (
    recordCondition(key) ?
        recordClass(value) :
        Map(value)
);

/**
 * Merge JSON data into a Map, with a possible transforming into a Map/(Map...)/Record
 * 
 * @param {Map} state  - a Record class definition
 * @param {JSON} data  - default: check for an empty string (standard case for a Map/Record)
 * @param {function} reviver  - default: undefined, leads to a Map merge without a Record layer
 * @param {function} mergeMethod  - default: merge
 */
export default (state, data, reviver, mergeMode = 'merge') => {
    return state[mergeMode](fromJS(data, reviver));
};
