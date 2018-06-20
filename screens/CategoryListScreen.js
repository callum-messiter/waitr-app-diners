import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { setRestaurantMenu } from '../actions';
import { restaurant } from '../utilities/waitrApi';

class CategoryListScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurantName', 'Menu'),
      headerStyle: {},
      headerTitleStyle: {},
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

  render() {
    return (
      <View>
        <FlatList
          data={this.props.restaurantMenu.categories}
          keyExtractor={category => category.categoryId}
          renderItem={({ item: category }) => (
            <ListItem
              title={category.name}
              onPress={() => {
                this.props.navigation.navigate('ItemList', {
                  categoryId: category.categoryId,
                  categoryName: category.name
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
  user: state.user
});

export default connect(mapPropsToState, { setRestaurantMenu })(CategoryListScreen);