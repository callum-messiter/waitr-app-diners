import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginComponent from '../components/Login';

export default createStackNavigator({
  Login: LoginComponent,
});