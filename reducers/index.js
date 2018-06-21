import { combineReducers } from 'redux';
import restaurants from './restaurantReducer';
import orders from './orderReducer';
import user from './userReducer';
import cart from './cartReducer';

export default combineReducers({
	restaurants, orders, user, cart
});