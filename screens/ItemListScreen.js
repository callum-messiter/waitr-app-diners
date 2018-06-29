import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon, Button } from 'react-native-elements';
import { addItemToCart } from '../actions';
import shortId from 'shortid';
import CartButton from '../components/CartButton';
import CartItemManager from '../components/CartItemManager';

class ItemListScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('categoryName', 'Menu'),
      headerRight: ( 
        <CartButton
          restaurantId={navigation.getParam('restaurantId', null)}
          onPress={() => navigation.navigate('Checkout', {  
            restaurantId: navigation.getParam('restaurantId', null),
            restaurantName: navigation.getParam('restaurantName', 'Order Summary')
          })}
        /> 
      )
    };
  };

  _getCategoryItems() {
    const category = this.props.restaurantMenu.categories.find((c) => {
      return c.categoryId == this.props.navigation.getParam('categoryId', null);
    });
    /* These should not arise; log errors if they do */
    if(category === undefined) return null;
    if(!category.hasOwnProperty('items')) return null;
    if(category.items.length < 1) return null;
    return category.items;
  }

  render() {
    const nav = this.props.navigation;
    const items = this._getCategoryItems();
    if(items === null) return null; /* Show an error page */
    
    return (
      <View>
        <FlatList
          data={items}
          keyExtractor={item => item.itemId}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={`£${parseFloat(item.price).toFixed(2)}`}
              rightIcon={
                <CartItemManager
                  item={item}
                  restaurantId={nav.getParam('restaurantId', null)}
                  menuId={nav.getParam('menuId', null)}
                  categoryId={nav.getParam('categoryId', null)}
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
  carts: state.carts
});

export default connect(mapPropsToState, { addItemToCart })(ItemListScreen);