import R from 'ramda';
import bug from '../../_libs/bug';

const citySel = ['city', {
    S: 0,
    M: 1,
    // F: 2
}];

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


const prepareFilterState = (filterState) => {
    bug('+++++ filterState', filterState)
    bug('++ filterState.order', filterState.order)
    bug('++ filterState.city', filterState.city)

    // filter.map()
    const filterProps = filterState.order.map((filterName) => {
        const filter = filterState[filterName];
        let preparedProp;
                                    bug('>>> prepareFilterState::filterProps filterName', filterName, filter);
                                                bug('>> this', filter.sel, filter.sortByOrder)
        if (filter.sel && !filter.sortByOrder) {
            preparedProp = [filterName];

            // -->> to push also sortOrder, sortRest, if inclRest
            const selIndex = makeIndex (filter.sel);
                                                                                bug('>>> selIndex', selIndex)
            preparedProp.push(selIndex);
                                                                        bug('>>> preparedProp', preparedProp)
        }

        return preparedProp;


        // else
        // return filterName

    }, filterState);

    return filterProps;

};

export default prepareFilterState;