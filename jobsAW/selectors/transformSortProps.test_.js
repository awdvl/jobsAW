import testData from './__testData';
import testState from './__testState';
import transformSortProps from './transformSortProps';
import bug from '../../_libs/bug';

describe('Data Transformation', () => {

    const sortProps = transformSortProps(testState.ui.filter, testData);

    it('should', () => {

    })

    bug(sortProps)

})

describe('Presort', () => {
    const otherOptions = {
        'index': { '4234567890': 'F', '5234567890': 'K' },
        'list': [
            {
                'id': 5234567890, 'company': 'Ford', 'country': 'DE', 'city': 'K',
                'smin': null, 'smax': null,
                'url': '', 'pubDate': null, 'startDate': null, 'type': 1, 'duration': null
            },
            {
                'id': 4234567890, 'company': 'Deutsche_Bank', 'country': 'DE', 'city': 'F',
                'smin': null, 'smax': null,
                'url': '', 'pubDate': null, 'startDate': null, 'type': 3, 'duration': null
            }
        ],
        'bucket': { 'K': 'K', 'F': 'F' }
    };

    const filter = {
        'sel': ['S', 'M'], 
        'sortOrder': ['pop'], 
        'sortByOrder': false, 
        'inclRest': true, 
        'sortRest': ['city'], 
        'excl': []
    };

    const filterName = 'city';

    
});
