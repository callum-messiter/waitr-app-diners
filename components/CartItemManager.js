import React from 'react';
import { connect } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../actions';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Text, ListItem, Icon, Badge } from 'react-native-elements';
import CartButton from './CartButton';
import NumItemsBadge from './NumItemsBadge';
import shortId from 'shortid';
import * as Cart from '../utilities/CartHelper';
import { isEmpty as _isEmpty } from 'underscore';
import Websockets from '../utilities/Websockets';

class CartItemManager extends React.Component {

  constructor(props){
    super(props);
    /* Replace instance method with a new 'bound' version */
    this._addItemToCart = this._addItemToCart.bind(this);
    this._removeItemFromCart = this._removeItemFromCart.bind(this);
  }

  _addItemToCart() {
    const restaurantId = this.props.restaurantId;

    const cart = Cart.getBreakdown(this.props.carts, restaurantId);
    /* Should never happen */
    if(_isEmpty(cart.data)) {
      return console.log('CartItemManager: cannot add item to non-existent cart');
    }

    this.props.addItemToCart({
      item: {
        itemId: this.props.item.itemId,
        cartItemId: shortId.generate(), /* Add unique ID */
        categoryId: this.props.categoryId,
        name: this.props.item.name,
        description: this.props.item.description,
        price: this.props.item.price
      },
      restaurantId: restaurantId,
      menuId: this.props.menuId
    });

    if(cart.numItems > 0) return;
    /* User becomes an active member of his current table */
    Websockets.sendUserJoinedTableMsg(this.props.user, restaurantId, cart.data.tableNo);
  }

  /* 
		Since the item passed down from the parent component is the menu item, we must find this item in the cart.
		The cart reducer references items using their cartItemId, which is of course a non existent property for
		menu items (when a menu item is added to the cart, the cartItemId is assigned.)

		If there are multiple instances of a menu item in the cart, we will just remove the first one found. 
		When we introduce item customisation (e.g. 'with salad'), the user will no longer be able to arbitrarily
		remove cart items using + and - icons; they will only be able to remove a specific item directly, by 
		referncing its cartItemId.
	*/
  _removeItemFromCart() {
    const itemId = this.props.item.itemId;
    const restaurantId = this.props.restaurantId;
    const cart = Cart.findItem(this.props.carts, restaurantId, itemId);
    
    /* Should never happen */
    if(!cart.exists || !cart.containsItem) {
      return console.log('CartItemManager: ' + cart.error);
    }

    this.props.removeItemFromCart({
      item: cart.itemData, 
      restaurantId: restaurantId
    });

    const removingFinalItem = (cart.cartData.items.length === 1) ? true : false;
    const tableNo = cart.cartData.tableNo;
    if(removingFinalItem) {
      Websockets.sendUserLeftTableMsg(this.props.user, restaurantId, tableNo);
    }
  }

  render() {
  	const cart = Cart.getBreakdown(this.props.carts, this.props.restaurantId);

    if(_isEmpty(cart.data)) return(
	    <Icon
			  name={'add'}
			  onPress={() => { this._addItemToCart() }}
			/>
		);

    const num = cart.data.items.filter((item) => {
      return item.itemId == this.props.item.itemId;
    }).length;

		if(num < 1) return(
			<Icon
			  name={'add'}
			  onPress={() => { this._addItemToCart() }}
			/>
		);

		return(
			<View style={styles.managerContainer}>
				<Icon
				  name={'remove'}
				  onPress={() => { this._removeItemFromCart() }}
				/>
				<Badge containerStyle={styles.badgeContainer}>
	        <Text>{num}</Text>
	      </Badge>
	      <Icon
				  name={'add'}
				  onPress={() => { this._addItemToCart() }}
				/>
      </View>
		);
  }
}

const styles = StyleSheet.create({
  cartBtn: {
    fontSize: 7
  },
  managerContainer: {
  	flexDirection: 'row',
  	flexWrap: 'wrap'
  },
  badgeContainer: {
    width: 30,
    backgroundColor: '#c2c8d1',
    borderRadius: 0,
    paddingLeft: 7,
    paddingRight: 7
  }
});

const mapPropsToState = (state) => ({
  carts: state.carts,
  user: state.user
});

export default connect(mapPropsToState, {
	addItemToCart, 
	removeItemFromCart
})(CartItemManager);