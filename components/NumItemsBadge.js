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
    /* If none of the cart items belong to this category, don't show the badge */
    if(num < 1) return (
      <Icon name={'chevron-right'} onPress={this.props.onPress} /> 
    );
    return (
      <Badge containerStyle={styles.badgeContainer}>
        <Text>{num}</Text>
      </Badge>
    )
  }
}

const styles = StyleSheet.create({
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
});

export default connect(mapPropsToState)(NumItemsBadge);