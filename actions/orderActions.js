import { orderActions as actions } from './types';

export const setOrders = (payload) => {
	return {
		type: actions.SET_ORDERS,
		payload: payload
	};
};