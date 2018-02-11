import { Map, fromJS } from 'immutable';

export default (recordClass, state, data) => {
    // first level a Map (key is an empty string), second a Record
    const reviver = (key, value) => {
        return key !== '' ?
            recordClass(value):
            Map(value);
    };

    return state.merge(fromJS(data, reviver));
};

// export default (recordClass) => {
//     // first level a Map (key is an empty string), second a Record
//     const reviver = (key, value) => {
//         return key !== '' ?
//             recordClass(value):
//             Map(value);
//     };

//     return (state, data) => 
//         state.merge(fromJS(data, reviver));
// };

