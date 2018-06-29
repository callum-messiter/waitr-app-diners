import { cartActions as actions } from './types';

export const createNewCart = (payload) => {
	return {
		type: actions.CREATE_NEW_CART,
		payload: payload
	};
}

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

export const updateCartTableNo = (payload) => {
	return {
		type: actions.UPDATE_CART_TABLE_NO,
		payload: payload
	};
}

export const resetCart = () => {
	return { type: actions.RESET_CART };
}