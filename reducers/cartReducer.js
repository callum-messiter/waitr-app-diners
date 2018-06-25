import { cartActions as actions } from '../actions/types';

/* 
	The initial state is an empty array. This will be populated with cart objects.
	A user may have mutiple carts at a given time. This is why the carts[] state is an array of cart objects.
	There can only be one cart object per restaurant. (Later this may change to one cart per menu.)
	Thus, each cart is uniquely identifiable by its restaurantId property.

	@param cart = {
		items: Array,
		totalPrice: Float,
		restaurantId: String,
		menuId: String
	}
*/
const initialState = [];

/*
	To update the carts[] state, we must first locate the specific cart that is to be updated.
	We find the target cart by referencing the provided restaurantId.

	Since we shouldn't mutate the carts[] state, we instead rebuild the carts array.
	We make use of the spread operator (...) to mimic how the carts array would "look" if the
	requested action had been applied to the target cart. What we return "becomes" the current 
	carts state, and changes will be reflected throghout the app.

	@param carts { This is the current carts state: an array of cart objects }
*/
const updateCartState = {
	addItem: (carts, data) => {
		const item = data.item;
		const cartIndex = carts.findIndex(cart => cart.restaurantId == data.restaurantId);
	    
	    /* If cart doesn't exist, create it; return existing carts + new cart */
	    if(cartIndex === -1) return [
    		...carts, /* Any existing carts */
    		{
		    	items: [item],
				totalPrice: parseFloat(item.price).toFixed(2),
				restaurantId: data.restaurantId,
				menuId: data.menuId
	    	}
	    ]
	    
	    /* Otherwise, return new state which reflects updated cart */
	    const cart = carts[cartIndex];
		var newTotal = parseFloat(cart.totalPrice) + parseFloat(item.price);
		return [
			...carts.slice(0, cartIndex),
			...carts.slice(cartIndex + 1),
			{
	    		...cart,
	    		items: [...cart.items, item],
				totalPrice: newTotal.toFixed(2)
	    	}
	    ];
	},
	
	removeItem: (carts, data) => {
		const cartIndex = carts.findIndex(cart => cart.restaurantId == data.restaurantId);
		console.log('cartIndex: ' + cartIndex);
		if(cartIndex === -1) return carts;
		const cart = carts[cartIndex], item = data.item;
		const itemIndex = cart.items.findIndex(i => i.cartItemId == item.cartItemId);
		console.log('itemIndex: ' + itemIndex);
		if(itemIndex === -1) return carts;
		
		/* If removing the cart's only item, just return the carts state without this cart */
		if(cart.items.length === 1) return [
			...carts.slice(0, cartIndex),
			...carts.slice(cartIndex + 1),
		];

		/* Otherwise, return new state which reflects updated cart */
		var newTotal = parseFloat(cart.totalPrice) - parseFloat(item.price);
		return [
			...carts.slice(0, cartIndex),
			...carts.slice(cartIndex + 1),
			{
	    		...cart,
	    		items: [
	    			...cart.items.slice(0, itemIndex),
	    			...cart.items.slice(itemIndex + 1) 
	    		],
				totalPrice: newTotal.toFixed(2)
	    	}
	    ];
	},
	resetCart: (carts, restaurantId) => {
		/* Return the carts state without this cart */
		const cartIndex = carts.findIndex(cart => cart.restaurantId == restaurantId);
		if(cartIndex === -1) return carts;
		return [
			...carts.slice(0, cartIndex),
			...carts.slice(cartIndex + 1)
		]
	}
}

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.ADD_CART_ITEM: return updateCartState.addItem(state, action.payload);
		case actions.REMOVE_CART_ITEM: return updateCartState.removeItem(state, action.payload);
		case actions.RESET_CART: return updateCartState.resetCart(state, action.payload);
		default: return state;
	}
}