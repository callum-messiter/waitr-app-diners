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