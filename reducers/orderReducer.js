import { orderActions as actions } from '../actions/types';

const initialState = [];

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.SET_ORDERS: return action.payload; break;
		default: return state;
	}
}