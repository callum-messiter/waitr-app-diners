import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import RootNavigation from '../navigation/RootNavigation';
import { connect } from 'react-redux';
import Websockets from '../utilities/Websockets';

class RootComponent extends React.Component {

  constructor(props) {
    super(props);
    Websockets.init();
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <RootNavigation />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingImg: {
    height: 150,
    width: 150
  }
});

const mapStoreToProps = state => ({
  user: state.user,
});

export default connect(mapStoreToProps)(RootComponent);
