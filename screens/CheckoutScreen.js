import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon, Button } from 'react-native-elements';
import { addItemToCart, removeItemFromCart, resetCart } from '../actions';
import * as Cart from '../utilities/CartHelper';
import Websockets from '../utilities/Websockets'; 
import { isEmpty as _isEmpty } from 'underscore';

class CheckoutScreen extends React.Component {
  
  constructor(props) {
    super(props);
    /* Replace instance method with a new 'bound' version */
    this._removeItemFromCart = this._removeItemFromCart.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Cart',
    };
  };

  _removeItemFromCart(item) {
    const restaurantId = this.props.navigation.getParam('restaurantId', null);
    const cart = Cart.findItem(this.props.carts, restaurantId, item.itemId);
    
    /* Should never happen */
    if(!cart.exists || !cart.containsItem) {
      return console.log('CheckoutScreen: ' + cart.error);
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

  _generateNumItemsString(cart) {
    var numItemsStr = cart.items.length + ' items';
    /* If there is only one item, we need 'item' instead of 'items' */
    if(cart.items.length === 1) {
      numItemsStr = numItemsStr.substring(0, numItemsStr.length - 1);
    }
    return `Total: £${cart.totalPrice} (${numItemsStr})`;
  }

  render() {
    const restaurantId = this.props.navigation.getParam('restaurantId', null);
    const restaurantName = this.props.navigation.getParam('restaurantName', null);
    const cart = Cart.getBreakdown(this.props.carts, restaurantId);
    if(cart.numItems < 1) return null;
    const cartBreakdownStr = this._generateNumItemsString(cart.data);
    
    return (
      <View style={styles.container}>
        <Text h4 style={styles.cartSummary}>{restaurantName} - Table #{cart.data.tableNo}</Text>
      	<Text h4 style={styles.cartSummary}>{cartBreakdownStr}</Text>
        <Button
          backgroundColor='#1b4a96'
          title={"Pay Now"}
          onPress={() => alert('Pay')}
        />
        <FlatList
          data={cart.data.items}
          keyExtractor={(item) => item.cartItemId}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name}, £${parseFloat(item.price).toFixed(2)}`}
              rightIcon={
                <Icon
                  name={'remove'}
                  onPress={() => this._removeItemFromCart(item)}
                />
              }
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  cartSummary: {
    alignSelf: 'center', 
    paddingTop: 10,
    paddingBottom: 10
  },
  payBtn: {
    backgroundColor: '#1b4a96'
  }
});

const mapPropsToState = (state) => ({
  carts: state.carts,
  user: state.user
});

export default connect(mapPropsToState, {
  addItemToCart, 
  removeItemFromCart, 
  resetCart
})(CheckoutScreen);