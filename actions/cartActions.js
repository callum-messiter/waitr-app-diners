import { cartActions as actions } from './types';

export const addItemToCart = (payload) => {
	return {
		type: actions.ADD_CART_ITEM,
		payload: payload
	};
};

export const removeItemFromCart = (payload) => {
	return {
		type: actions.REMOVE_CART_ITEM,
		payload: payload
	};
}

export const resetCart = () => {
	return { type: actions.RESET_CART };
}