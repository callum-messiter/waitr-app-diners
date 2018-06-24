import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Text, ListItem, Icon, Badge } from 'react-native-elements';

class NumItemsBadge extends React.Component {

  constructor(props){
    super(props);
  }

  countNumberOfCategoryItemsInCart() {
    const cart = this.props.carts.find((cart) => {
      return cart.restaurantId == this.props.restaurantId;
    });
    if (cart === undefined) return 0;

    return num = cart.items.filter((item) => {
      return item.categoryId == this.props.categoryId;
    }).length;
  }

  render() {
    const num = this.countNumberOfCategoryItemsInCart();
    if(num < 1) return null;
    return (
      <Badge value={num} />
    )
  }
}

const styles = StyleSheet.create({
});

const mapPropsToState = (state) => ({
  carts: state.carts,
});

export default connect(mapPropsToState)(NumItemsBadge);