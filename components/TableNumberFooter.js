import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getBreakdown as getCartBreakdown } from '../utilities/CartHelper';
import { isEmpty as _isEmpty } from 'underscore';

class TableNumberFooter extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const cart = getCartBreakdown(this.props.carts, this.props.restaurantId);
    if(_isEmpty(cart.data)) return null;
    return (
      <View style={styles.container}>
        <Text>{this.props.restaurantName}</Text>
        <Text>Table number #{cart.data.tableNo}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center' 
  }
});

const mapPropsToState = (state) => ({
  carts: state.carts,
});

export default connect(mapPropsToState)(TableNumberFooter);