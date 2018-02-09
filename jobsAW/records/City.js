import { Record } from 'immutable';

const CityRecord = Record({
    pop: 0,
    state: 0,
    loc: ''
})

// const test = new Record({loc: 'W'})

// console.log('test', test)
// console.log('test2', test.toString())
// console.log('test2', test.get('loc'))

const City = CityRecord;

// class City extends CityRecord {

// }

export default City;
// export { City };



