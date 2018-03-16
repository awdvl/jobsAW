
export const UPDATE_FILTER_ORDER = 'UPDATE_FILTER_ORDER';
export const UPDATE_FILTER_ISMOVING = 'UPDATE_FILTER_ISMOVING';

export const UPDATE_ISMOVING_FROM_ZONE = 'UPDATE_ISMOVING_FROM_ZONE';

export const UPDATE_CITY_ORDER = 'UPDATE_CITY_ORDER';

export const MOVE_TO_CITY_ZONE = 'MOVE_TO_CITY_ZONE';

export const updateTypes = {
    _: UPDATE_FILTER_ORDER,
    city: UPDATE_CITY_ORDER
};

export const moveTypes = {
    city: MOVE_TO_CITY_ZONE,
};

// export const onlyTopTypes = {
//     UPDATE_ONLY_TOP
// }

const typesFactory = (types, template, option = {}) => {
    // const typesObj = {}
    
    const typesObj = types.reduce((prev, elem) => {
        // return template.join (elem.toUpperCase ())
        prev[elem] = template.join (elem.toUpperCase ());

        return prev;
    }, {})


    return {...typesObj, ...option};
    // return typesObj;
};

const ttypes = ['city', 'jobType'];
const ttemplate = ['UPDATE_', '_ONLY_TOP'];

// console.log ('** typesFactory', typesFactory (ttypes, ttemplate))
console.log ('** typesFactory', typesFactory (ttypes, ttemplate, {_: 'UPDATE_FILTER_ORDER'}))