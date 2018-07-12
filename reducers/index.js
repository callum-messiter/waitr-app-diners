import { combineReducers } from 'redux';
import restaurants from './restaurantReducer';
import orders from './orderReducer';
import user from './userReducer';
import carts from './cartReducer';
import pushNotification from './pushNotificationReducer';

export default combineReducers({
	restaurants, 
	orders, 
	user, 
	carts, 
	pushNotification
});