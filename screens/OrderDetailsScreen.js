import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';
import { order } from '../utilities/waitrApi';

class OrderDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Order ' + navigation.getParam('orderId', 'Details'),
      headerStyle: {},
      headerTitleStyle: {},
    };
  };

  componentWillMount() {
    const token = this.props.user.token;
    const orderId = this.props.navigation.getParam('orderId', null);
    this.api_getOrderDetails(token, orderId);
  }

  api_getOrderDetails(token, orderId) {
    return order.get(token, orderId)
    .then((res) => {
      /* TODO: the order state should have two props: list[] and focus{}. Here we dispatch the setFocusOrder action */
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <View>
      	<Text>Order Details</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
});

const mapStoreToProps = state => ({
  user: state.user
});

export default connect(mapStoreToProps, {})(OrderDetailsScreen);