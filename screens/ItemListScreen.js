import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon, Button } from 'react-native-elements';
import { addItemToCart } from '../actions';
import { restaurant } from '../utilities/waitrApi';
import shortId from 'shortid';
import CartButton from '../components/CartButton';

class ItemListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    /* Replace instance method with a new 'bound' version */
    this._addItemToCart = this._addItemToCart.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('categoryName', 'Menu'),
      headerRight: ( 
        <CartButton
          onPress={() => navigation.navigate('Checkout', {
            restaurantName: navigation.getParam('restaurantName', 'Order Summary')
          })}
        /> 
      )
    };
  };

  _addItemToCart(item) {
    this.props.addItemToCart({
      item: {
        itemid: item.itemId,
        cartItemId: shortId.generate(), /* Add unique ID */
        name: item.name,
        description: item.description,
        price: item.price
      },
      restaurantId: this.props.navigation.getParam('restaurantId', null),
      menuId: this.props.navigation.getParam('menuId', null)
    });
  }

  render() {
    const items = this.props.restaurantMenu.categories.find((c) => {
      return c.categoryId == this.props.navigation.getParam('categoryId', null);
    }).items;

    return (
      <View>
        <FlatList
          data={items}
          keyExtractor={item => item.itemId}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              rightIcon={
                <Icon
                  name={'add'}
                  onPress={ () => { this._addItemToCart(item)} }
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
});

const mapPropsToState = (state) => ({
  restaurantMenu: state.restaurants.menu,
  user: state.user,
  cart: state.cart
});

export default connect(mapPropsToState, { addItemToCart })(ItemListScreen);