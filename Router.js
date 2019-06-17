
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import UsersMap from './components/UsersMap';
import ShowUserLocation from './components/ShowUserLocation';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
//import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './components/List';
import firebase from 'firebase/app';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database";
import "firebase/database";
import { firebaseConfig } from './components/src/Config';
import Card from './components/Card';
import Scroll from './components/Scroll';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
//import 


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
      inside: false
    }
  }

  getUserCoord = () => {
    console.log("pressed")
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ 
        position: { 
          lng: position.coords.longitude,
          lat: position.coords.latitude
        }
      });
      console.log(position)
      fetch('https://lesesalentheapp.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          lng: position.coords.longitude, 
          lat: position.coords.latitude,
          //TODO change radius value
          inside: this.isInside(99.0)
        })
      })
      .then(res => console.log("res"))
      .catch(err => console.log(err));
    }, err => console.log(err));
  }

  isInside = radius => {
    const R = 6371000;
    if (!this.state.position) { 
      console.log("No position!")
      return false;
    }
    const { lat, lng } = this.state.position;
    //const lat = 60.382186;
    //const lng = 5.332215;
    const lesesalenLat = 60.381192;
    const lesesalenLng = 5.331556;
    const radians = Math.PI / 180.0;
    const rlesesalenLat = lesesalenLat * radians;
    const rlat = lat * radians;
    const triLat = Math.abs(lat-lesesalenLat) * radians;
    const triLong = Math.abs(lesesalenLng-lng) * radians;
    
    const a = (Math.sin(triLat/2)*Math.sin(triLat/2))+(Math.cos(lesesalenLat*radians)*Math.cos(lat*radians)*Math.sin(triLong/2.0)*Math.sin(triLong/2.0));
    //console.log(a)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //console.log(c)
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
        <ShowUserLocation title={"Send user location"} position = {this.getUserCoord} />
        { this.state.position ? <Text> {this.state.position.lng} {this.state.position.lat} </Text> : null }
        { this.isInside(9999999999999.0) ? <Text> Inside </Text> : <Text> Not inside </Text>}
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
*/ //flytta ut i egen component
/*class Profile extends React.Component {
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
}*/


const sizeOfIcons = 30;


export const SignedOut = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Sign Up",
      }
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: "Sign In"
      }
    }
  });
export const SignedIn = createBottomTabNavigator(
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
    //Card kan vere tabellen med lista, scroll er en wrapper(?) funksjon som må ver på utsida av card
    Leaderboard: { 
      screen: createMaterialTopTabNavigator({
        Alltime: () => <Scroll> 
          <Card />
        </Scroll>,
        Semester: () => <Scroll> 
        <Card>
        </Card>
      </Scroll>,
        Weekly: () => <Scroll> 
        <Card>
        </Card>
      </Scroll>,
      }),
      navigationOptions: {
        //Styling for ikon.
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
  /*{
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
    tabStyle: {  isInside = radius => {

      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    style: {
      backgroundColor: 'white',
    },
    statusBarStyle: 'light-content',
  },
}*/
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut,
        
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

//export const createAppContainer(createRootNavigator);

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
    backgroundColor: '#A7CFDB'
  }
});
