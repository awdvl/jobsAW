import testData from './__testData';
import testState from './__testState';
import transformSortProps from './transformSortProps';
import bug from '../../_libs/bug';

describe('Data Transformation', () => {

    const sortProps = transformSortProps(testState.ui.filter, testData);

    it ('should', () => {

    })
    
    bug(sortProps)

})
