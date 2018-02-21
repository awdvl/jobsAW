import R from 'ramda';

import bug from '../../_libs/bug';

/**
 *  Log data with a name
 * 
 *  const averageTriangle = R.pipe(
 *      R.map(multiplySides),
 *      log('mult'),
 *      R.map(divideByTwo),
 *      log('div'),
 *      R.mean
 *  );
 * 
 *  https://blog.carbonfive.com/2017/12/20/easy-pipeline-debugging-with-curried-console-log/
 * 
 */
export const log = (...args) => (data) => {
    console.log.apply(null, args.concat([data]));
    return data;
};

/**
 *  Add peak in a pipe (instead of log('xxx') above)
 * 
 *  https://halistechnology.com/2017/08/14/after-sliced-bread-came-ramda-js-part-ii/
 */
const pretty = any => JSON.stringify(any, null, 2);  
const peak = R.tap(R.compose(console.log, pretty));


export const getProp = (prop) => R.prop(prop);

// use: groupByProp = groupBy(prop);  grouped = groupByProp(data);
export const groupBy = R.pipe(getProp, R.groupBy);



// const grouper = R.curry((prop, selection, inclRest, elem) => {
const grouper = R.curry((prop, selection, elem) => {
    const value = elem[prop]

    if (selection.includes(value)) {
        return value;

    // } else if (inclRest) {
    //     return '_';

    } else {
        // return '';
        return '_';
    }

});

// var byGrade = R.groupBy(function(student) {
//     var score = student.score;
//     return score < 65 ? 'F' :
//            score < 70 ? 'D' :
//            score < 80 ? 'C' :
//            score < 90 ? 'B' : 'A';
//   });

export const groupByFn = R.pipe(grouper, R.groupBy);

export const flatten = (selection, data) => {
    const ret = [];

    return data.reduce(elem => {

    });

}