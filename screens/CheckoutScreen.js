import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon, Button } from 'react-native-elements';
import { addItemToCart, removeItemFromCart, resetCart } from '../actions';

class CheckoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Cart',
    };
  };

  render() {
    /* Get the cart by restaurantId */
    const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.navigation.getParam('restaurantId', null);
    });
    console.log(cart);
    if(cart === undefined) return null;
    var numItemsStr = cart.items.length + ' items';
    if(cart.items.length === 1) {
      numItemsStr = numItemsStr.substring(0, numItemsStr.length - 1);
    }
    return (
      <View style={styles.container}>
        <Text h3 style={styles.cartSummary}>{this.props.navigation.getParam('restaurantName', null)}</Text>
      	<Text h4 style={styles.cartSummary}>Total: £{cart.totalPrice} ({numItemsStr})</Text>
        <Button
          backgroundColor='#1b4a96'
          title={"Pay Now"}
          onPress={() => alert('Pay')}
        />
        <FlatList
          data={cart.items}
          keyExtractor={(item) => item.cartItemId}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name}, £${parseFloat(item.price).toFixed(2)}`}
              rightIcon={
                <Icon
                  name={'remove'}
                  onPress={ () => {this.props.removeItemFromCart(item)} }
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
  carts: state.carts
});

export default connect(mapPropsToState, {
  addItemToCart, 
  removeItemFromCart, 
  resetCart
})(CheckoutScreen);