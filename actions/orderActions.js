import { orderActions as actions } from './types';

export const setOrders = (payload) => {
	return {
		type: actions.SET_ORDERS,
		payload: payload
	};
};

export const updateOrderStatus = (order) => {
	return {
		type: actions.UPDATE_ORDER_STATUS,
		payload: payload
	}
}