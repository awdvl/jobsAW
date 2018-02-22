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

// group by selection;  if inclRest, collect elems in the '_' key
const grouper = R.curry((prop, selection, elem) => {
    const value = elem[prop]

    return selection.includes(value) ? value : '_';

});


export const groupBySelection = R.pipe(grouper, R.groupBy);

export const flatten = (selection, data) => {
    let flattened = selection.reduce((acc, elem) => acc.concat(data[elem]), []);

    if (data._) {
        flattened = flattened.concat(data._);
    }

    return flattened;
};