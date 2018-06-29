import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TextInput, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { setUser } from '../actions';
import { user } from '../utilities/waitrApi';
import * as V from '../utilities/fieldValidator';

class SignupScreen extends React.Component {

  constructor(props) {
    super(props);
    /* Replace instance method with a new 'bound' version */
    this.registerUserOnBackend = this.registerUserOnBackend.bind(this);
    this.validateAllFields = this.validateAllFields.bind(this);
  }

  registerUserOnBackend() {
    const params = {
      firstName: this.firstName, 
      lastName: this.lastName, 
      email: this.email, 
      password: this.confPassword
    };
    
    const allFieldsValid = this.validateAllFields(params);
    if(allFieldsValid !== true) {
      const error = allFieldsValid;
      /* TODO: display flash message */
      return console.log(error);
    }
    
    user.signup(params, this.props.user.token)
    .then((res) => {
      /* For now, skip email verification; log user in automatically */
      return user.login(this.email, this.confPassword);
    }).then((res) => {
      res.data.data.user.isAuth = true;
      this.props.setUser(res.data.data.user);
    }).catch((err) => {
      console.log('user creation err: ' + JSON.stringify(err));
    });
  }
  
  validateAllFields(values) {
    if( V.someFieldsAreEmpty(values) ) return V.errors.fieldsEmpty;
    if( !V.isEmail(values.email) ) return V.errors.invalidEmail;
    if( !V.stringLengthBetween(values.firstName, 1, 100) ) return V.errors.firstNameLength;
    if( !V.stringLengthBetween(values.lastName, 1, 100) ) return V.errors.lastNameLength;
    if( !V.stringLengthBetween(this.password, 6, 100) ) return V.errors.passLength;
    if( !V.areEqual(this.password, values.password) ) return V.errors.passMismatch;
    return true;
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
            placeholder='Enter your first name' 
            style={styles.input}
            onChangeText={(text) => this.firstName = text}
          />
          <TextInput
            placeholder='Enter your last name' 
            style={styles.input}
            onChangeText={(text) => this.lastName = text}
          />
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
          <TextInput
            placeholder='Confirm your password' 
            style={styles.input}
            onChangeText={(text) => this.confPassword = text}
          />
          <Button title='Signup' color='#fff' onPress={this.registerUserOnBackend} />
          <Button 
            title='Go to login'
            color='#fff' 
            onPress={() => this.props.navigation.navigate('Login')}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 300,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  }
});

const mapStoreToProps = state => ({
  user: state.user
});

export default connect(mapStoreToProps, { setUser })(SignupScreen);