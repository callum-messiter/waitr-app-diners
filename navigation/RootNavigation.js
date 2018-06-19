import React from 'react';
import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import MainAppNavigator from './MainAppNavigator';
import LandingNavigator from './LandingNavigator';

const createRootNavigator = (userIsAuthenticated = false) => {
  return createSwitchNavigator(
    {
      Main: MainAppNavigator,
      Landing: LandingNavigator
    },
    {
      initialRouteName: (userIsAuthenticated) ? 'Main' : 'Landing'
    }
  );
}

class RootNavigation extends React.Component {
  render() {
    const RootNavigator = createRootNavigator(this.props.user.isAuth);
    return <RootNavigator/>;
  }
}

const mapStoreToProps = state => ({
  user: state.user
});

export default connect(mapStoreToProps)(RootNavigation);
