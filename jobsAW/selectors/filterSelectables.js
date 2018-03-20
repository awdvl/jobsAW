import R from 'ramda';

import makeIndex from '../../_libs/makeIndex';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';

import bug from '../../_libs/bug';



// const extractAll = (filterNames, filters, data) => {
export const extractAll = (filters, data) => {
                                                                            bug ('*** extractAll filters ', filters);
    const bucketReducer = (getProp, bucket) => (prev, curr) => {
        const propValue = getProp(curr);
        // bug('curr', curr, propValue)
        bucket[propValue] = bucket[propValue] ||
            prev.push(propValue) && propValue;

        return prev;
    };

    const getNotSelectablesIndex = (filter) => ({
        ...makeIndex(filter.sel, 1),
        ...makeIndex(filter.excl, 1)
    });

    // const filterName = 'jobType';
    //     const filterName = 'compEmply';
    // bug('+++ selector getNotSelectablesIndex', getNotSelectablesIndex (filters[filterName]));
    // bug('+++ --', filterPropAccessorFor (filters).getPropName (filterName))
    // bug('+++ --', filterPropAccessorFor (filters).getPropNameMapped ('emply'))

    const filterPredicateWith = (notSelectablesIndex) =>
        (elem) => !notSelectablesIndex[elem];

    const uniqueReducer = (filters, filterName) =>
        bucketReducer(filterPropAccessorFor(filters).getProp(filterName), {});

    const selectablesPredicate = (filters, filterName) =>
        R.compose(filterPredicateWith, getNotSelectablesIndex)(filters[filterName]);

    const mapper = (filters) => (filterName) =>
        R.pipe(
            R.reduce(uniqueReducer(filters, filterName), []),
            R.filter (selectablesPredicate (filters, filterName))
        );

    const xmap = R.pipe(
        R.map(R.applyTo(filters, mapper)),
        R.map(R.applyTo(data))
    );

    return xmap;
    // const xmap2 = xmap (filterNames);
    //                                                                     bug ('*** extractAll xmap2', xmap2);

    // return xmap2;
};