import typesFactory from '../../_libs/typesFactory';


// const filterTypes = ['city', 'jobType'];
export const filterTypes = ['city', 'jobType', 'compIndy', 'compEmply'];

export const updateTypes = typesFactory (filterTypes, ['UPDATE_', '_ORDER'], {_: 'UPDATE_FILTER_ORDER'})
export const moveTypes = typesFactory (filterTypes, ['MOVE_TO_', '_ZONE']);
export const onlyTopTypes = typesFactory (filterTypes, ['UPDATE_', '_ONLY_TOP']);

export const UPDATE_FILTER_ISMOVING = 'UPDATE_FILTER_ISMOVING';
export const UPDATE_ISMOVING_FROM_ZONE = 'UPDATE_ISMOVING_FROM_ZONE';

// console.log ('** typesFactory onlyTopTypes', onlyTopTypes)

