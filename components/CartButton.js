import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';

class CartButton extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.cart.items.length < 1) return null;
    return (
      <Button
        title={`£${this.props.cart.totalPrice} (${this.props.cart.items.length})`}
        onPress={this.props.onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
});

const mapPropsToState = (state) => ({
  cart: state.cart,
});

export default connect(mapPropsToState)(CartButton);