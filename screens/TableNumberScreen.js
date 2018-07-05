import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import { Text, ListItem, Icon, Button, FormLabel, FormInput } from 'react-native-elements';
import * as V from '../utilities/fieldValidator';
import { createNewCart, updateCartTableNo } from '../actions';
import { getBreakdown as getCartBreakdown } from '../utilities/CartHelper';
import { isEmpty as _isEmpty } from 'underscore';
import Websockets from '../utilities/Websockets';

class TableNumberScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this._setTableNumber = this._setTableNumber.bind(this);
    this._validateField = this._validateField.bind(this);
  }

  componentWillMount() {
    const restaurantId = this.props.navigation.getParam('restaurantId', null);
    this.tableNo = getCartBreakdown(this.props.carts, restaurantId).data.tableNo || '';
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurantName', 'Table Number')
    };
  };

  _setTableNumber() {
    const fieldIsValid = this._validateField(this.tableNo);
    if(fieldIsValid !== true) {
      const error = fieldIsValid;
      return console.log(error); /* TODO: display flash message */
    }

    const restaurantId = this.props.navigation.getParam('restaurantId', null);
    const restaurantName = this.props.navigation.getParam('restaurantName', null);
    const menuId = this.props.navigation.getParam('menuId', null);
    const tableNo = this.tableNo;
    const cart = getCartBreakdown(this.props.carts, restaurantId);
    
    /* If the cart doesn't exist yet, create it */
    if(_isEmpty(cart.data)) { 
      this.props.createNewCart( {restaurantId, menuId, tableNo} );
    } else {
      this.props.updateCartTableNo( {restaurantId, tableNo} );
    }

    if(cart.data.tableNo != tableNo && cart.numItems > 0) {
      /* User becomes an active member of the new table */
      Websockets.sendUserJoinedTableMsg(this.props.user, restaurantId, this.tableNo);
    }

    /* Move on to list of menu categories */
    this.props.navigation.navigate('CategoryList', {
      restaurantId: restaurantId,
      restaurantName: restaurantName,
      menuId: menuId, /* For now the restaurant has just one menu */
    });
  }

  _validateField(value) {
    if( !V.isSet(value) ) return V.errors.fieldsEmpty;
    return true;
  }

  render() {
    const restaurantId = this.props.navigation.getParam('restaurantId', null);
    const tableNo = getCartBreakdown(this.props.carts, restaurantId).data.tableNo || '';

    return (
      <View style={styles.container}>
        <Text>Enter your table number: </Text>
        <TextInput
          value={tableNo}
          style={styles.input}
          onChangeText={(text) => this.tableNo = text}
        />
        <Button 
          title='Ok'
          color='#fff' 
          onPress={this._setTableNumber}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40 
  },
  input: {
    width: 100,
    height: 30,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  }
});

const mapPropsToState = (state) => ({
  user: state.user,
  carts: state.carts
});

export default connect(mapPropsToState, {
  createNewCart,
  updateCartTableNo
})(TableNumberScreen);