import { FETCH_COMPANIES_SUCCESS } from '../constants/fetch';
// import Company from '../records/Company';
// import buildSimpleDataReducer from '../utils/buildSimpleDataReducer';
import buildDumbDataReducer from '../utils/buildDumbDataReducer';

export default buildDumbDataReducer(FETCH_COMPANIES_SUCCESS);

// export default buildSimpleDataReducer(FETCH_COMPANIES_SUCCESS, Company);

// const companies = (state={}, action) => {
//     switch(action.type) {
//         case FETCH_COMPANIES_SUCCESS:
//             return action.response;

//         default:
//             return state;
//     }
// }

// export default companies;