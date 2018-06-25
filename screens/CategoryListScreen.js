import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { setRestaurantMenu } from '../actions';
import { restaurant } from '../utilities/waitrApi';
import CartButton from '../components/CartButton';
import NumItemsBadge from '../components/NumItemsBadge';

class CategoryListScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurantName', 'Menu'),
      headerTitleStyle: { marginRight: 30 },
      headerRight: ( 
        <CartButton
          style={styles.cartBtn}
          restaurantId={navigation.getParam('restaurantId', null)}
          onPress={() => navigation.navigate('Checkout', {
            restaurantId: navigation.getParam('restaurantId', null),
            restaurantName: navigation.getParam('restaurantName', null)
          })}
        /> 
      )
    };
  };

  componentWillMount() {
    const token = this.props.user.token;
    const menuId = this.props.navigation.getParam('menuId', null);
    this.api_getRestaurantMenu(token, menuId);
  }

  api_getRestaurantMenu(token, menuId) {
    return restaurant.getMenu(token, menuId)
    .then((res) => {
      if(res.hasOwnProperty('data')) return this.props.setRestaurantMenu(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  navigateToItemList(category) {
    this.props.navigation.navigate('ItemList', {
      categoryId: category.categoryId,
      categoryName: category.name,
      restaurantId: this.props.navigation.getParam('restaurantId', null),
      restaurantName: this.props.navigation.getParam('restaurantName', null),
      menuId: this.props.navigation.getParam('menuId', null)
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.restaurantMenu.categories}
          keyExtractor={category => category.categoryId}
          renderItem={({ item: category }) => (
            <ListItem
              title={category.name}
              rightIcon={
                <NumItemsBadge
                  restaurantId={this.props.navigation.getParam('restaurantId', null)} 
                  categoryId={category.categoryId}
                />
              }
              onPress={() => { this.navigateToItemList(category) }}
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
    backgroundColor: '#1b1c23'
  },
  tagline: {
  	color: '#fff',
    marginTop: 20,
    textAlign: 'center'
  },
  categoryName: {
    color: '#33adff',
    marginTop: 20
  },
  itemName: {
    color: '#fff',
    marginTop: 5
  }
});

const mapPropsToState = (state) => ({
  restaurants: state.restaurants.list,
  restaurantMenu: state.restaurants.menu,
  user: state.user,
  carts: state.carts
});

export default connect(mapPropsToState, { setRestaurantMenu })(CategoryListScreen);