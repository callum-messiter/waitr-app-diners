import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export default createSwitchNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
});