import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
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
    return (
      <View>
        {
          this.props.restaurantMenu.categories.find((c) => {
            return c.categoryId == this.props.navigation.getParam('categoryId', null);
          }).items.map((item) => (
            <ListItem
              key={item.itemId}
              title={item.name}
            />
          ))
        }
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