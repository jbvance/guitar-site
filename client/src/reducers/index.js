import { combineReducers } from 'redux';
import user from './userReducer';
import products from './productReducer';

const rootReducer = combineReducers({
    user,
    products
});

export default rootReducer;