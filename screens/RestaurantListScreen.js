import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { setRestaurants } from '../actions';
import { restaurant } from '../utilities/waitrApi';
import CartButton from '../components/CartButton';
import RestaurantRightIcon from '../components/RestaurantRightIcon';

class RestaurantListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Restaurants'
    };
  };

  componentWillMount() {
    this.api_getListOfRestaurants();
  }

  api_getListOfRestaurants() {
    return restaurant.getList(this.props.user.token)
    .then((res) => {
      if(res.hasOwnProperty('data')) return this.props.setRestaurants(res.data.data);
    }).catch((err) => {
      console.log(err);
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
              rightIcon={
                <RestaurantRightIcon 
                  restaurantId={restaurant.restaurantId}
                  onPress={() => {
                    this.props.navigation.navigate('CategoryList', {
                      restaurantId: restaurant.restaurantId,
                      restaurantName: restaurant.name,
                      menuId: restaurant.menus[0].menuId, /* For now the restaurant has just one menu */
                    });
                  }} 
                />
              }
              onPress={() => {
                this.props.navigation.navigate('CategoryList', {
                  restaurantId: restaurant.restaurantId,
                  restaurantName: restaurant.name,
                  menuId: restaurant.menus[0].menuId, /* For now the restaurant has just one menu */
                });
              }}
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