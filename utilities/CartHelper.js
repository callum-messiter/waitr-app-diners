import { isEmpty as _isEmpty } from 'underscore';

export const getBreakdown = (carts, restaurantId) => {
    var cartBreakdown = { numItems: 0, data: {} };;
    
    /* Get the cart for the given restaurant */
    const cart = carts.find((cart) => {
      return cart.restaurantId == restaurantId;
    });
    
    if (cart !== undefined) {
      cartBreakdown.numItems = cart.items.length;
      cartBreakdown.data = cart; 
    }
    return cartBreakdown;
}

export const findItem = (carts, restaurantId, itemId) => {
  var cartBreakdown = {
    exists: false, 
    containsItem: false, 
    cartData: {}, 
    itemData: {}, 
    error: null
  };
  
  /* Check if cart exists */
  const cart = getBreakdown(carts, restaurantId);
  if(_isEmpty(cart.data)) {
    cartBreakdown.error = 'cart does not exist.';
    return cartBreakdown;
  } else {
    cartBreakdown.exists = true;
    cartBreakdown.cartData = cart.data;
  }

  /* Check if item is in cart */
  const cartItem = cart.data.items.find((item) => {
    return item.itemId == itemId;
  });
  if(cartItem === undefined) {
    cartBreakdown.error = 'cart does not contain item.';
  } else {
    cartBreakdown.containsItem = true;
    cartBreakdown.itemData = cartItem;
  }

  return cartBreakdown;
}