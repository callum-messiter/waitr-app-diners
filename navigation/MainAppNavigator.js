import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import ItemListScreen from '../screens/ItemListScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import LoginComponent from '../components/Login';

const RestaurantStack = createStackNavigator({
  RestaurantList: RestaurantListScreen,
  CategoryList: CategoryListScreen,
  ItemList: ItemListScreen
});

const CheckoutStack = createStackNavigator({
  Checkout: CheckoutScreen,
});

const OrderStack = createStackNavigator({
  MyOrders: MyOrdersScreen,
  OrderDetails: OrderDetailsScreen
});

RestaurantStack.navigationOptions = {
  tabBarLabel: 'Restaurants',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

CheckoutStack.navigationOptions = {
  tabBarLabel: 'Place Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-paper-plane${focused ? '' : '-outline'}` : 'md-paper-plane'}
    />
  ),
};

OrderStack.navigationOptions = {
  tabBarLabel: 'My Orders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  RestaurantStack,
  CheckoutStack,
  OrderStack
});
