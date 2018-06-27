import { orderActions as actions } from '../actions/types';

const initialState = [];

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.SET_ORDERS: return action.payload; break;
		case actions.UPDATE_ORDER_STATUS:
			/* Find the order object in the orderHistory array */
			/* Update the status */
			return;
		default: return state;
	}
}