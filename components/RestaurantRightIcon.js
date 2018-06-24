import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import CartButton from './CartButton';

class RestaurantRightIcon extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    /* Get the cart for the given restaurant */
    const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });
    if(cart === undefined) {
      return ( 
        <Icon name={'chevron-right'} onPress={this.props.onPress} /> 
      );
    } else {
      return (
        <CartButton restaurantId={this.props.restaurantId} onPress={this.props.onPress} />
      );
    }
  }
}

const styles = StyleSheet.create({
});

const mapPropsToState = (state) => ({
  carts: state.carts,
});

export default connect(mapPropsToState)(RestaurantRightIcon);