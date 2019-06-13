import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemComponent from './ItemComponent'

export default class List extends Component {
  state = {
    items: []
  };

  componentDidMount() {
      /*
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });*/
  }

  render() {
    return (
      <View style={styles.container}>
          <Text> {JSON.stringify(this.props.data)} </Text>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});