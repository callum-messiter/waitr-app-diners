import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { setOrders, deauthenticateUser } from '../actions';
import { Order } from '../utilities/waitrApi';
import moment from 'moment';

class MyOrdersScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Orders',
      headerStyle: {},
      headerTitleStyle: {},
    };
  };

  componentWillMount() {
    this._getUserOrderHistoryFromBackend();
  }

  _getUserOrderHistoryFromBackend() {
    return Order.getList(this.props.user.token)
    .then((res) => {
      orders = this._addTimeAgoPropToEachOrder(res.data); /* e.g. timeAgo: '2 hours ago' */
      return this.props.setOrders(orders);
    }).catch((err) => {
      console.log(err);
    });
  }

  _addTimeAgoPropToEachOrder(orders) {
    for(var o of orders) { o.timeAgo = moment(o.time).utc().fromNow(); }
    return orders;
  }

  _navigateToOrderDetailsScreen(order) {
    this.props.navigation.navigate('OrderDetails', {
      orderId: order.orderId
    });
  }

  render() {
    return (
      <View>
        <Button 
          title='Logout'
          onPress={() => this.props.deauthenticateUser()}
        />
        <FlatList
          data={this.props.orders}
          keyExtractor={order => order.orderId}
          renderItem={({ item: order }) => (
            <ListItem
              title={`${order.restaurantName} | £${parseFloat(order.price).toFixed(2)}`}
              subtitle={order.timeAgo}
              onPress={() => this._navigateToOrderDetailsScreen(order)}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  }
});

const mapStoreToProps = state => ({
  orders: state.orders,
  user: state.user
});

export default connect(mapStoreToProps, { 
  setOrders, 
  deauthenticateUser 
})(MyOrdersScreen);