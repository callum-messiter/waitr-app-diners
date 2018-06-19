import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { setOrders, deauthenticateUser } from '../actions';
import { order } from '../utilities/waitrApi';
import moment from 'moment';

class MyOrdersScreen extends React.Component {
  
  constructor(props) {
    super(props);
    /* Replace instance method with a new 'bound' version */
    this.logUserOut = this.logUserOut.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Orders',
      headerStyle: {},
      headerTitleStyle: {},
    };
  };

  componentWillMount() {
    this.api_getOrderHistoryForUser();
  }

  api_getOrderHistoryForUser() {
    return order.getList(this.props.user.token)
    .then((res) => {
      orders = this.addTimeAgoPropToEachOrder(res.data); /* e.g. timeAgo: '2 hours ago' */
      return this.props.setOrders(orders);
    }).catch((err) => {
      console.log(err);
    });
  }

  addTimeAgoPropToEachOrder(orders) {
    for(var o of orders) { o.timeAgo = moment(o.time).utc().fromNow(); }
    return orders;
  }

  logUserOut() {
    this.props.deauthenticateUser();
    // this.props.navigation.navigate('Landing');
  }

  render() {
    return (
      <View>
        <Button 
          title='Logout'
          onPress={this.logUserOut}
        />
        {
          this.props.orders.map((order) => (
            <ListItem
              key={order.orderId}
              title={`${order.restaurantName} | £${parseFloat(order.price).toFixed(2)}`}
              subtitle={order.timeAgo}
              onPress={() => {
                this.props.navigation.navigate('OrderDetails', {
                  orderId: order.orderId
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
  orders: state.orders,
  user: state.user
});

export default connect(mapStoreToProps, { 
  setOrders, 
  deauthenticateUser 
})(MyOrdersScreen);