import { addIndex, reduce } from 'ramda';

const reduceIndexed = addIndex (reduce);

/**
 *  @param ary {Array} -  the array for which the index will be made
 *  @param acc {Object}  -  the accumulator start value  -  default: {}
 *  @param i {Number} -  array index from which on the index will be added  -  default: 0 (new index)
 */
export default (ary, i = 0) => (
    reduceIndexed ( (acc, value, index) => {
        acc[value] = index + i;
        return acc;
    }, 
    {}

) (ary, i));

// export default (ary, acc = {}, i = 0) => (
//     reduceIndexed ( (acc, value, index) => {
//         acc[value] = index + i;
//         return acc;
//     }, 
//     acc

// ) (ary, i));