import { cartActions as actions } from '../actions/types';

const initialState = [];

export default state = (state = initialState, action) => {
	const p = action.payload;
	switch(action.type) {
		case actions.ADD_CART_ITEM:
			const indexA = state.findIndex(cart => cart.restaurantId == p.restaurantId);
		    /* If cart for this restaurant doesn't exist, create it */
		    if(indexA === -1) return [
	    		...state, 
	    		{
			    	items: [p.item],
					totalPrice: parseFloat(p.item.price).toFixed(2),
					restaurantId: p.restaurantId,
					menuId: p.menuId
		    	}
		    ]
			/* If cart exists, update this cart */
			var newTotal = parseFloat(state[indexA].totalPrice) + parseFloat(p.item.price);
			return [
				...state.slice(0, indexA), /* All preceding carts */
				...state.slice(indexA + 1), /* All succeeding carts */
				/* The cart that has been updated */
				{
		    		...state[indexA],
		    		items: [...state[indexA].items, p.item],
					totalPrice: newTotal.toFixed(2)
		    	}
		    ];

		case actions.REMOVE_CART_ITEM:
			/* Get the cart by restaurantId */
			const indexR = state.items.findIndex(i => i.cartItemId == p.cartItemId);
			if(indexR === -1) return state; /* If item not found, return current cart */
			if(state.items.length === 1) return initialState; /* If final item, return default cart */
			var newTotal = parseFloat(state.totalPrice) - parseFloat(p.price);
			return {
				...state,
				items: [
					...state.items.slice(0, indexR), /* All preceding items */
					...state.items.slice(indexR + 1) /* All succeeding items */
				],
				totalPrice: newTotal.toFixed(2)
			};

		// case actions.RESET_CART: return initialState;
		default: return state;
	}
}