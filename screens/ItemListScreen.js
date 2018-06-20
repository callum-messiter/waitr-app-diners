import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { setRestaurantMenu } from '../actions';
import { restaurant } from '../utilities/waitrApi';

class ItemListScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('categoryName', 'Menu'),
      headerStyle: {},
      headerTitleStyle: {},
    };
  };

  componentWillMount() {
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
  user: state.user
});

export default connect(mapPropsToState, {})(ItemListScreen);