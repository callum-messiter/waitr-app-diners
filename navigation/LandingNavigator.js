import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import LoginComponent from '../components/Login';
import SignupScreen from '../screens/SignupScreen';

export default createSwitchNavigator({
  Login: LoginComponent,
  Signup: SignupScreen
});