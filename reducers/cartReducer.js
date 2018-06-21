import { cartActions as actions } from '../actions/types';

const initialState = {
	restaurantId: null,
	menuId: null,
	totalPrice: parseFloat(0.00).toFixed(2), 
	items: [] 
};

export default state = (state = initialState, action) => {
	const p = action.payload;
	switch(action.type) {

		case actions.ADD_CART_ITEM:
			var newTotal = parseFloat(state.totalPrice) + parseFloat(p.item.price);
			const newCart = {
				...state,
				items: [p.item, ...state.items],
				totalPrice: newTotal.toFixed(2)
			};
			/* If first item, set metadata */
			if(state.items.length === 0) {
				newCart.restaurantId = p.restaurantId;
				newCart.menuId = p.menuId
			};
			return newCart;

		case actions.REMOVE_CART_ITEM:
			const index = state.items.findIndex(i => i.itemId == p.item.itemId);
			if(index === -1) return state; /* If item not found, return current cart */
			if(state.items.length === 1) return initialState; /* If final item, return default cart */
			var newTotal = parseFloat(state.totalPrice) - parseFloat(p.price);
			return {
				...state,
				items: [
					...state.items.slice(0, index), /* All preceding items */
					...state.items.slice(index + 1) /* All succeeding items */
				],
				totalPrice: newTotal.toFixed(2)
			};

		case actions.RESET_CART: return initialState; break;
		default: return state;
	}
}