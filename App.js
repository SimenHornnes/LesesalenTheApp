/**
 * App - Hovedfil, rammeverk
 * TopTabsLeaderBoard - definerer komponent(er) for øverste bar i leaderboard screen
 * 1. Få til innloggings screen
 * 2. Få til scrolling i leaderboard i toptabs.
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import UsersMap from './components/UsersMap';
import ShowUserLocation from './components/ShowUserLocation';
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import LeaderboardUpdate from './components/TopTabsLeaderboard';
import TopTabNavigator from './components/TopTabsLeaderboard';
import List from './components/List';
import firebase from 'firebase/app';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database";
import "firebase/database";
import { firebaseConfig } from './components/src/Config';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
      position: undefined,
      highScoreList: [] }
  }
  
  getUserCoord = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ 
        position: { 
          lng: position.coords.longitude, 
          lat: position.coords.latitude 
        }
      });
      fetch('https://lesesalentheapp.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          lng: position.coords.longitude, 
          lat: position.coords.latitude 
        })
      })
      .then(res => Console.log(res))
      .catch(err => Console.log(err));
    }, err => console.log(err));
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
      <View style={{...styles.HomescreenStyle, ...styles.container}}> 
        <ShowUserLocation title={"User location "} position = {this.getUserCoord} />
        { this.state.position ? <Text> {this.state.position.lng} {this.state.position.lat} </Text> : null }
        { this.isInside(115.0) ? <Text> Inside </Text> : <Text> Not inside </Text>}
        <UsersMap />
      </View>
    );
  }
}

/*class LeaderBoard extends React.Component {
  
  render() {
    return (
      <View></View>
    );
  }

}
*/
class Profile extends React.Component {
  render() {
    return (
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseDatabaseNode path={"lesesalentheapp"}>
          { d => { console.log(d); return (
            <View>
              
              <List data={d}/>
            </View>)
          }}
        </FirebaseDatabaseNode>
       </FirebaseDatabaseProvider>
    );
  }
}


const sizeOfIcons = 30;

let highScoreList2 = []
let highScoreList = ['Simen']


getHighscoreList = () => {
  fetch('https://lesesalentheapp.firebaseio.com/places.json')
    .then(res => res.json())
    .then(parsedRes => {
      const hList = [];
      for (const key in parsedRes) {
        hList.push({
          navn: parsedRes[key].lat
        });
      }
      return hList
    })
    .catch(err => Console.log(err));
};

const TabNavigator = createBottomTabNavigator(
  {
    Homescreen: { 
      screen: App,
      navigationOptions: {
          tabBarIcon: () => { return (<Icon name="md-home" size = {sizeOfIcons} color = '#0097A7' />)},
      } 
    },
    /*Leaderboard: { 
      screen: TopTabNavigator,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name = "md-list" size = {sizeOfIcons} color = '#0097A7' />)},
      } 
    },*/

    Leaderboard: { 
      screen: createMaterialTopTabNavigator({
        Alltime: () => <LeaderboardUpdate highscoreList={highScoreList} title="All time high"/>,
        Semester: () => <LeaderboardUpdate highscoreList={highScoreList} title="Semester"/>,
        Weekly: () => <LeaderboardUpdate highscoreList={highScoreList} title="Weekly"/>
      }),
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name = "md-list" size = {sizeOfIcons} color = '#0097A7' />)},
      } 
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        //change md-more
        tabBarIcon: () => { return (<Icon name = "md-more" size = {sizeOfIcons} color = '#0097A7' />) }

      }
    },
  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
    header: null,
    headerMode: 'none',
    tabBarVisible: true,
    tabBarLabel: () => {
      const { routeName } = navigation.state;
      switch (routeName) {
        //
      }
      return <Text>{routeName}</Text>;
    },
  }),
  animationEnabled: false,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: 'rgb(12,157,197)',
    inactiveTintColor: 'black',
    indicatorStyle: {
      backgroundColor: 'rgb(102,134,205)',
    },
    tabStyle: {
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    style: {
      backgroundColor: 'white',
    },
    statusBarStyle: 'light-content',
  },
}
);

export default createAppContainer(TabNavigator);

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
