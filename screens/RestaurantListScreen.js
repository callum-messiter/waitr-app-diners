import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { setRestaurants } from '../actions';
import { Restaurant } from '../utilities/waitrApi';
import { getBreakdown as getCartBreakdown } from '../utilities/CartHelper';
import CartButton from '../components/CartButton';
import RestaurantRightIcon from '../components/RestaurantRightIcon';

class RestaurantListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Restaurants'
    };
  };

  componentWillMount() {
    this._getRestaurantsListFromBackend();
  }

  _getRestaurantsListFromBackend() {
    return Restaurant.getList(this.props.user.token)
    .then((res) => {
      if(res.hasOwnProperty('data')) return this.props.setRestaurants(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  _navigateToNextScreen(restaurant) {
    // const cartData = getCartBreakdown(this.props.carts, restaurant.restaurantId).data;
    // const targetScreen = ( cartData.hasOwnProperty('tableNo') ) ? 'CategoryList' : 'SetTableNumber'
    this.props.navigation.navigate('SetTableNumber', {
      restaurantId: restaurant.restaurantId,
      restaurantName: restaurant.name,
      menuId: restaurant.menus[0].menuId, /* For now the restaurant has just one menu */
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.restaurants}
          keyExtractor={restaurant => restaurant.restaurantId}
          renderItem={({ item: restaurant }) => (
            <ListItem
              title={restaurant.name}
              onPress={() => this._navigateToNextScreen(restaurant)}
              rightIcon={
                <RestaurantRightIcon 
                  restaurantId={restaurant.restaurantId}
                  onPress={() => this._navigateToNextScreen(restaurant)}
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

const mapStoreToProps = state => ({
  restaurants: state.restaurants.list,
  user: state.user,
  carts: state.carts
});

export default connect(mapStoreToProps, { setRestaurants })(RestaurantListScreen);