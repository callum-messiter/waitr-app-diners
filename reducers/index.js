import { combineReducers } from 'redux';
import restaurants from './restaurantReducer';
import orders from './orderReducer';
import user from './userReducer';

export default combineReducers({
	restaurants, orders, user
});