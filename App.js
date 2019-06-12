/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import UsersMap from './components/UsersMap';
import ShowUserLocation from './components/ShowUserLocation';
import { createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
//import console = require('console');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { position: undefined }
  }

  getUserCoord = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position: { lng: position.coords.longitude, lat: position.coords.latitude }},console.log(position)
      ), err => console.log(err)
    });
  }

  isInside = radius => {
    const R = 6371000;
    if (!this.state.position) { 
      console.log("No position!")
      return false;
    }
    //const { lat, lng } = this.state.position;
    const lat = 60.382186;
    const lng = 5.332215;
    const lesesalenLat = 60.381192;
    const lesesalenLng = 5.331556;
    const radians = Math.PI / 180.0;
    const rlesesalenLat = lesesalenLat * radians;
    const rlat = lat * radians;
    const triLat = Math.abs(lat-lesesalenLat) * radians;
    const triLong = Math.abs(lesesalenLng-lng) * radians;
    
    const a = (Math.sin(triLat/2)*Math.sin(triLat/2))+(Math.cos(lesesalenLat*radians)*Math.cos(lat*radians)*Math.sin(triLong/2.0)*Math.sin(triLong/2.0));
    console.log(a)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    console.log(c)
    const answer = R * c
    console.log(answer)
    if(answer > radius){
      return false;
    }
    return true;
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
 //     console.log(position);
    }, err => console.log(err));
  }
  //<FetchLocation title={"Find location"} onGetLocation = {this.getUserLocationHandler} />
  render() {
    return (
      <View style={styles.container}> 
        <ShowUserLocation title={"User location "} position = {this.getUserCoord} />
        { this.state.position ? <Text> {this.state.position.lng} {this.state.position.lat} </Text> : null }
        { this.isInside(115.0) ? <Text> Inside </Text> : <Text> Not inside </Text>}
        <UsersMap />
      </View>
    );
  }
}

class LeaderBoard extends React.Component {
  render() {
    return (
      <View>

      </View>
    );
  }

}

const TabNavigator = createBottomTabNavigator(
  {
    Homescreen: { screen: App },
    Leaderboard: { screen: LeaderBoard },
  },
  {
    navigationOptions: ({ navigation } ) => ({
      tabBarIcon: ({ focused, red}) => {
        const { routeName } = navigation.state;
        let iconName;
        if(routeName === 'Homescreen'){
          iconName = `ios-information-circle${focused ? '' : '-outline' }`;
        } else if(routeName === 'Leaderboard') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        return <Ionicons name = {iconName} size = {25} color = {red} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'orange',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
