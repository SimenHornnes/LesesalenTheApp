import React, {Component} from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



class LeaderboardUpdate extends React.Component {
  render() {
    return (
      <Text style={{fontWeight: 'bold', ...styles.fontsize}}>
        {this.props.title}
      </Text>
    );
  }

}
const TopTabNavigator = createMaterialTopTabNavigator(
  {
    Alltime: { 
      screen: LeaderboardUpdate,
      navigationOptions: {
          tabBarIcon: () => { return (<Icon name="md-home" size = {sizeOfIcons} color = '#0097A7' />)},
        } 
    },
    Semester: { 
      screen: LeaderboardUpdate,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name = "md-list" size = {sizeOfIcons} color = '#0097A7' />)}
      } 
    },
    Weekly: {
      screen: LeaderboardUpdate,
      navigationOptions: {
        //change md-more
        tabBarIcon: () => { return (<Icon name = "md-more" size = {sizeOfIcons} color = '#0097A7' />) }

      }
    },
  },
  {
  tabBarOptions: {
    //Style for tabBar
    style: {
      backgroundColor: 'white',
    },
    //Style for når man trykker på tabs
    activeTintColor: '#0097A7',
    inactiveTintColor: '#0097A7',
    showLabel: false,
  },
});



export default LeaderboardUpdate;

//export default createAppContainer(TopTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  fontsize: {
    fontSize: 100
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  HomescreenStyle: {
    backgroundColor: '#D0D0D0'
  }
});
