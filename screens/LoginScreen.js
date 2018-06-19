import React from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo} 
            source={require('../assets/images/logo.png')}
          />
          <Text style={styles.tagline}>Let's eat!</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter your email" 
            style={styles.input}
          />
          <TextInput
            placeholder="Enter your password" 
            style={styles.input}
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1c23'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start' 
  },
  logo: {
    marginTop: 100,
    width: 100,
    height: 100
  },
  tagline: {
    color: '#fff',
    marginTop: 20,
    width: 150,
    textAlign: 'center' 
  },
  formContainer: {
    padding: 50
  },
  input: {
    height: 20,
    backgroundColor: '#fff',
    marginBottom: 20
  }
});