import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';

class CartButton extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    /* Get the cart for the given restaurant */
    const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });
    if (cart === undefined) return null;
    if(cart.items.length < 1) return null;
    return (
      <Button
        title={`£${cart.totalPrice} (${cart.items.length})`}
        onPress={this.props.onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
});

const mapPropsToState = (state) => ({
  carts: state.carts,
});

export default connect(mapPropsToState)(CartButton);