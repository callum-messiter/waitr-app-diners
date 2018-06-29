import { orderActions as actions } from '../actions/types';

const initialState = [];

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.SET_ORDERS: return action.payload; break;
		case actions.UPDATE_ORDER_STATUS: 
			return orderState.updateOrderStatus(state, action.payload);
		default: return state;
	}
}

const orderState = {
	updateOrderStatus: (orders, order) => {
		const orderIndex = orders.findIndex(o => o.orderId == order.orderId);
		if(orderIndex === -1) return orders;
		return [
			...orders.slice(0, orderIndex),
			...orders.slice(orderIndex + 1),
			{
				...orders[orderIndex],
				status: order.status
			}
		]
	}
}