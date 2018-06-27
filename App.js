import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import RootComponent from './components/RootComponent';
import Loading from './components/Loading';

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </Provider>
    )
  }

}