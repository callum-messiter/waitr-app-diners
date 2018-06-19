import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { setRestaurants } from '../actions';
import { restaurant } from '../utilities/waitrApi';

class RestaurantListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Restaurants'
    };
  };

  componentWillMount() {
    console.log('user (r list): ' + JSON.stringify(this.props.user));
    this.api_getListOfRestaurants();
  }

  api_getListOfRestaurants() {
    return restaurant.getList(this.props.user.token)
    .then((res) => {
      console.log(JSON.stringify(res.data.data));
      if(res.hasOwnProperty('data')) return this.props.setRestaurants(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <View>
        {
          this.props.restaurants.map((restaurant) => (
            <ListItem
              key={restaurant.restaurantId}
              title={restaurant.name}
              onPress={() => {
                this.props.navigation.navigate('CategoryList', {
                  restaurantId: restaurant.restaurantId,
                  restaurantName: restaurant.name,
                  menuId: restaurant.menus[0].menuId, /* For now the restaurant has just one menu */
                });
              }}
            />
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
});

const mapStoreToProps = state => ({
  restaurants: state.restaurants.list,
  user: state.user
});

export default connect(mapStoreToProps, { setRestaurants })(RestaurantListScreen);