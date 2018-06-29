import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';

class OrderDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Order ' + navigation.getParam('orderId', 'Details'),
      headerStyle: {},
      headerTitleStyle: {},
    };
  };

  render() {
    const orderId = this.props.navigation.getParam('orderId', null);
    const order = this.props.orders.find((o) => {
      return o.orderId == this.props.navigation.getParam('orderId', null);
    });
    /* These should not arise; log errors if they do */
    if(order === undefined) return null;
    return (
      <View>
      	<Text>{`${order.restaurantName}, £${parseFloat(order.price).toFixed(2)} (${order.items.length})`}</Text>
        <Text>{order.status}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
});

const mapStoreToProps = state => ({
  user: state.user,
  orders: state.orders
});

export default connect(mapStoreToProps, {})(OrderDetailsScreen);