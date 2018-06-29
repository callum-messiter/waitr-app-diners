import React from 'react';
import { connect } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../actions';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Text, ListItem, Icon, Badge } from 'react-native-elements';
import Websockets from '../utilities/Websockets';
import CartButton from './CartButton';
import NumItemsBadge from './NumItemsBadge';
import shortId from 'shortid';

class CartItemManager extends React.Component {

  constructor(props){
    super(props);
    /* Replace instance method with a new 'bound' version */
    this._addItemToCart = this._addItemToCart.bind(this);
    this._removeItemFromCart = this._removeItemFromCart.bind(this);
  }

  _addItemToCart() {
    this.props.addItemToCart({
      item: {
        itemId: this.props.item.itemId,
        cartItemId: shortId.generate(), /* Add unique ID */
        categoryId: this.props.categoryId,
        name: this.props.item.name,
        description: this.props.item.description,
        price: this.props.item.price
      },
      restaurantId: this.props.restaurantId,
      menuId: this.props.menuId
    });
    const userJoinedTable = Websockets.events.outbound.userJoinedTable;
    this._sendTableUpdateToServer(userJoinedTable);
  }

  /* 
		Since the item passed down from the parent component is the menu item, we must find this item in the cart.
		The cart reducer references items using their cartItemId, which is of course a non existent property for
		menu items (when a menu item is added to the cart, the cartItemId is assigned.)

		If there are multiple instances of a menu item in the cart, we will just remove the first one found. 
		When we introduce item customisation (e.g. 'with salad'), the user will no longer be able to arbitrarily
		remove cart items using + and - icons; they will only be able to remove a specific item directly, by 
		referncing itscartItemId.
	*/
  _removeItemFromCart() {
  	const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });
    if(cart === undefined) return;

    const cartItem = cart.items.find((item) => {
      return item.itemId == this.props.item.itemId;
    });
    this.props.removeItemFromCart({
      item: cartItem, 
      restaurantId: this.props.restaurantId
    });
  }

  _sendTableUpdateToServer(eventType) {
    const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });
    if(cart !== undefined) return;
    if(cart.items.length > 0) return;

    Websockets.emitMessage(eventType, {
      headers: {
        token: this.props.user.token
      },
      table: {
        restaurantId: this.props.restaurantId,
        customerId: this.props.user.userId,
        tableNo: cart.tableNo
      }
    });
  }

  render() {
  	const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });

    if(cart === undefined) return(
	    <Icon
			  name={'add'}
			  onPress={() => { this._addItemToCart() }}
			/>
		);

    const num = cart.items.filter((item) => {
      return item.itemId == this.props.item.itemId;
    }).length;

		if(num < 1) return (
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