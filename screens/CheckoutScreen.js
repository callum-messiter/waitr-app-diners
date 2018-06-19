import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';

export default class CheckoutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.tagline}>Checkout</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1c23'
  },
  tagline: {
  	color: '#fff'
  }
});