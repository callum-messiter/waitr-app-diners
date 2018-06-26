import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class CartButton extends React.Component {

  constructor(props){
    super(props);
  }

  getCartBreakdown() {
    var cartBreakdown = { numItems: 0, data: {} };
    /* Get the cart for the given restaurant */
    const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });
    if (cart !== undefined) {
      cartBreakdown.numItems = cart.items.length;
      cartBreakdown.data = cart; 
    }
    return cartBreakdown;
  }

  render() {
    const cart = this.getCartBreakdown();
    if(cart.numItems < 1) return null;
    return (
      <Button
        titleStyle={styles.btnTitle}
        buttonStyle={styles.cartBtn}
        title={`£${cart.data.totalPrice} (${cart.data.items.length})`}
        onPress={this.props.onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
  cartBtn: {
    backgroundColor: "#2089dc",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    padding: 7
  },
  btnTitle: {
    fontSize: 7
  }
});

const mapPropsToState = (state) => ({
  carts: state.carts,
});

export default connect(mapPropsToState)(CartButton);