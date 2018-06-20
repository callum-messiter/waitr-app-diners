import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { setOrders, deauthenticateUser } from '../actions';
import { order } from '../utilities/waitrApi';
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

  render() {
    return (
      <View>
        <Button 
          title='Logout'
          onPress={ () => {this.props.deauthenticateUser();} }
        />
        <FlatList
          data={this.props.orders}
          keyExtractor={order => order.orderId}
          renderItem={({ item: order }) => (
            <ListItem
              title={`${order.restaurantName} | £${parseFloat(order.price).toFixed(2)}`}
              subtitle={order.timeAgo}
              onPress={() => {
                this.props.navigation.navigate('OrderDetails', {
                  orderId: order.orderId
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