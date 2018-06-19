import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TextInput, Button } from 'react-native';
import { setUser } from '../actions';
import { user } from '../utilities/waitrApi';

class Login extends React.Component {

  constructor(props) {
    super(props);
    /* Replace instance method with a new 'bound' version */
    this.api_logUserIn = this.api_logUserIn.bind(this);
  }
  
  api_logUserIn() {
    if(this.email == undefined || this.password == undefined) return;
    
    user.login(this.email, this.password)
    .then((res) => {
      console.log(JSON.stringify(res));
      res.data.data.user.isAuth = true;
      this.props.setUser(res.data.data.user);
      // this.props.navigation.navigate('Main');
    }).catch((err) => {
      console.log(err);
    });
  }

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
            placeholder='Enter your email'
            style={styles.input}
            onChangeText={(text) => this.email = text}
          />
          <TextInput
            placeholder='Enter your password' 
            style={styles.input}
            onChangeText={(text) => this.password = text}
          />
          <Button title='Login' color='#fff' onPress={this.api_logUserIn} />
          <Button 
            title='Go to signup'
            color='#fff' 
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}
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
  },
  signupLink: {
    color: '#fff'
  }
});

const mapStoreToProps = state => ({
  user: state.user
});

export default connect(mapStoreToProps, { setUser })(Login);