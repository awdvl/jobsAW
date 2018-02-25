import R from 'ramda';
import bug from '../../_libs/bug';

// const citySel = ['city', {
//     S: 0,
//     M: 1,
//     // F: 2
// }];

// sel: [],
// sortOrder: [],
// sortByOrder: false,
// inclRest: false,
// sortRest: true,
// excl: []


const reduceIndexed = R.addIndex(R.reduce);
const makeIndex = (ary) => reduceIndexed ( (acc, value, index) => {
    acc[value] = index;
    return acc;
}, {})(ary);

// this better as transform
const transformSortProps = (filterState) => {
                                                            // bug('+++++ filterState', filterState)
                                                            // bug('++ filterState.__order', filterState.__order)
                                                            // bug('++ filterState.city', filterState.city)
    const filterProps = filterState.__order.map((filterName) => {
        const filter = filterState[filterName];
        let preparedProp = [];
                                    bug('>>> transformSortProps::filterProps filterName', filterName, filter);
                                                bug('>> this', filter.sel, filter.sortByOrder)
        if (filter.sel && !filter.sortByOrder) {
            // preparedProp = [filterName];
            preparedProp = [filterState.__mapToPath.get(filterName) || filterName];

            // -->> to push also sortOrder, sortRest, if inclRest
            const selIndex = makeIndex (filter.sel);
                                                                                bug('>>> selIndex', selIndex)
            preparedProp.push(selIndex);
                                                                        bug('>>> preparedProp', preparedProp)
        // } else if (!R.isEmpty(filter.sortOrder) && filter.sortByOrder) {

        }

        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default transformSortProps;