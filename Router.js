
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, PermissionsAndroid } from 'react-native';
import UsersMap from './components/UsersMap';
import ShowUserLocation from './components/ShowUserLocation';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './components/List';
import firebase from 'firebase/app';
import "firebase/database";
import { Button } from 'react-native-elements';
//import ApiCalendar from 'react-google-calendar-api';
//import GetEvents from './components/Lesesalprogram2'

import Achievements from './components/Achievements';
import AllTimeLeaderBoard from './components/AllTimeLeaderBoard';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import DidYouKnow from './components/DidYouKnow'
import LesesalProgram from './components/lesesalprogram'
import DetailScreen from './components/DetailScreen'




async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

class Homescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: undefined,
      inside: false,
      userId: undefined,
      name: undefined,
      // hours: undefined,
      funfact: undefined,
      dataSource: [], //for google calender
      pageToken: '',
      error: null,

    }
  }




  componentWillMount() {

    const { currentUser } = firebase.auth()
    console.log("compdidmount")
    if (currentUser != null) {
      this.setState({ userId: currentUser.uid, name: currentUser.displayName })
    }
    console.log("THIS IS THE USERNAME: ", this.state.name)
  }

  componentDidMount() {
    requestLocationPermission()
    this.displayGoogleCalendar()
    this.DidYouKnow()
  }


  displayGoogleCalendar = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentTime = `${year}-${month}-${date}T00:00:00Z`;
    const API_KEY = 'AIzaSyDX56itpFfR3zfjfJK0nUesbFLBo4pYfVc';
    let url = `https://www.googleapis.com/calendar/v3/calendars/t3rc186t378bvsv4mjpie6l1ic@group.calendar.google.com/events?key=${API_KEY}&timeMin=${currentTime}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${this.state.pageToken}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          pageToken: responseJson.nextPageToken,
          dataSource: [...this.state.dataSource, ...responseJson.items],
          error: responseJson.error || null,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }







  getUserCoord = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        }

      });
      if (this.isInside(999999999999999.9)) {
        if (this.state.userId) {

          const recentPost = firebase.database().ref(`allTime/${this.state.userId}/hours`);
          recentPost.once('value').then(snapshot => {
            firebase.database().ref(`allTime/${this.state.userId}`).update({
              name: this.state.name,
              hours: 100 + snapshot.val(),
              haveBeenToSchool: true
            })
            //this.setState({ hours: snapshot.val() + 100 })
          })
          const recentPost2 = firebase.database().ref(`semester/${this.state.userId}/hours`);
          recentPost2.once('value').then(snapshot => {
            firebase.database().ref(`semester/${this.state.userId}`).update({
              name: this.state.name,
              hours: 100 + snapshot.val(),
              haveBeenToSchool: true
            })
            //this.setState({ hours: snapshot.val() + 100 })
          })
          const recentPost3 = firebase.database().ref(`weekly/${this.state.userId}/hours`);
          recentPost3.once('value').then(snapshot => {
            firebase.database().ref(`weekly/${this.state.userId}`).update({
              name: this.state.name,
              hours: 100 + snapshot.val(),
              haveBeenToSchool: true
            })
            //this.setState({ hours: snapshot.val() + 100 })
          })
        }
      }
      else {
        console.log("Ingen userId")
      }

    }, err => console.log(err));
  }

  isInside = radius => {
    const R = 6371000;
    if (!this.state.position) {
      return false;
    }
    const { lat, lng } = this.state.position;

    const lesesalenLat = 60.381192;
    const lesesalenLng = 5.331556;
    const radians = Math.PI / 180.0;
    const rlesesalenLat = lesesalenLat * radians;
    const rlat = lat * radians;
    const triLat = Math.abs(lat - lesesalenLat) * radians;
    const triLong = Math.abs(lesesalenLng - lng) * radians;

    const a = (Math.sin(triLat / 2) * Math.sin(triLat / 2)) + (Math.cos(lesesalenLat * radians) * Math.cos(lat * radians) * Math.sin(triLong / 2.0) * Math.sin(triLong / 2.0));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const answer = R * c
    if (answer > radius) {
      return false;
    }
    return true;
  }

  DidYouKnow = () => {
    const didYouKnow = ["Did you know?", "Did you know that 2", "Did you know 3", "Did you know that cashews come from a fruit",
      "Did you know that 5", "Did you know 6", "Did you know 7", "Did you know 8"]
    const rand = Math.floor(Math.random() * didYouKnow.length);
    this.setState({ funfact: didYouKnow[rand] })

  };


  render() {

    const isDataSourceLoaded = this.state.dataSource.length > 0

    return (
      <View style={{ ...styles.HomescreenStyle }}>
        <StatusBar backgroundColor="#D2922D" />

        <View style={{ borderBottomWidth: 1, borderColor: 'black', backgroundColor: 'orange' }}><Text style={styles.textStyleHomescreen}>Kalender for Lesesalen</Text></View>
        <View style={{ height: '75%', marginBottom: 30, }}>{isDataSourceLoaded ? (<LesesalProgram data={this.state.dataSource} />) : (<Text>Loading</Text>)}</View>

        {this.state.name ? (<ShowUserLocation title={"Send user location"} position={this.getUserCoord} />) : null}
        {this.state.position ? <Text> {this.state.position.lng} {this.state.position.lat} </Text> : null}
        {this.isInside(9999999999999.0) ? <Text> Inside </Text> : <Text> Not inside </Text>}
        <Text style={{ color: 'white', alignSelf: 'center' }}>{this.state.funfact}</Text>
      </View>
    );
  }


}



const sizeOfIcons = 32;

const LeaderBoardWrapperView = createStackNavigator(

  {
    Leaderboard: {
      screen: Leaderboard = createMaterialTopTabNavigator({
        //THANK YOU SAEED
        Alltime: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="allTime" />,
        Semester: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="semester" />,
        Weekly: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="weekly" />,


      }, {
          tabBarOptions: {
            pressColor: 'white',
            labelStyle: {
              fontSize: 14,
              fontWeight: '300'
            },

            indicatorStyle: { backgroundColor: 'white' },
            activeTintColor: 'white',
            inactiveTintColor: '#2D3245',
            style: {
              borderTopColor: 'transparent',
              backgroundColor: 'orange',
            }
          }
        }
      ),
      navigationOptions: {
        header: () => <Text style={{ backgroundColor: 'orange', fontSize: 25, color: 'white', paddingLeft: '2%', paddingTop: '3%' }}> Leaderboard </Text>,
      }
    },
    DetailScreen: {
      screen: DetailScreen,

    },
  },

  {
    initialRouteName: 'Leaderboard',

    defaultNavigationOptions: {

      gesturesEnabled: true,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'orange',
      },
    }
  })





const profileWrapperView = createStackNavigator(

  {
    Profile: {
      screen: createMaterialTopTabNavigator({
        Profile: () =>
          <Profile />,
        Achievements: () =>
          <Achievements />,

      }, {
          tabBarOptions: {
            pressColor: 'white',
            labelStyle: {
              fontSize: 16,
              fontWeight: '300'
            },
            indicatorStyle: { backgroundColor: 'white' },
            activeTintColor: 'white',
            inactiveTintColor: '#2D3245',
            style: {
              backgroundColor: 'orange'
            }
          }

        }
      ),
      navigationOptions: {
        header: () => <Text style={{ backgroundColor: 'orange', fontSize: 25, color: 'white', paddingLeft: '3%', paddingTop: '3%' }}>Profile </Text>,
      }
    },

    DetailScreen: {
      screen: DetailScreen,

    },
  },

  {
    initialRouteName: 'Profile',

    defaultNavigationOptions: {

      gesturesEnabled: true,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'orange',
      },
    }
  })


/*const Leaderboard = createMaterialTopTabNavigator({
  Alltime: () =>
    <AllTimeLeaderBoard path="allTime" />,
  Semester: () =>
    <AllTimeLeaderBoard path="semester" />,
  Weekly: () =>
    <AllTimeLeaderBoard path="weekly" />,


}, {
    tabBarOptions: {
      pressColor: 'white',
      labelStyle: {
        fontSize: 16,
        fontWeight: '300'
      },
      indicatorStyle: { backgroundColor: 'transparent' },
      activeTintColor: 'white',
      inactiveTintColor: '#2D3245',
      style: {
        backgroundColor: 'orange'
      }
    }
  }
)*/



export const SignedOut = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        //title: "Sign In",
        header: null,
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Sign Up",
        /*headerStyle: {
          backgroundColor: 'orange',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },*/
      }
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'orange',
      },
    }
  });

export const SignedIn = createBottomTabNavigator(
  {
    Homescreen: {
      screen: Homescreen,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name="md-home" size={sizeOfIcons} color='#2D3245' />) },
      }
    },
    Leaderboard: {
      screen: LeaderBoardWrapperView,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name="md-list" size={sizeOfIcons} color='#2D3245' />) },
      }

    },
    Profile: {
      screen: profileWrapperView,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name='md-person' size={sizeOfIcons} color='#2D3245' />) }

      }
    }
    /*Leaderboard:  {
      screen: createMaterialTopTabNavigator({
        Alltime: () =>
          <AllTimeLeaderBoard path="allTime" />,
        Semester: () =>
          <AllTimeLeaderBoard path="semester" />,
        Weekly: () =>
          <AllTimeLeaderBoard path="weekly" />,


      },
      {
          tabBarOptions: {
            pressColor: 'white',
            labelStyle: {
              fontSize: 16,
              fontWeight: '300',
            },
            indicatorStyle: { backgroundColor: 'transparent' },
            activeTintColor: 'white',
            inactiveTintColor: '#2D3245',
            style: {
              backgroundColor: 'orange'
            }
          }
        },
        {
          navigationOptions: {
            headerTitle: 'Leaderboard'
          }
        }
      ),
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name="md-list" size={sizeOfIcons} color='#2D3245' />) },
      }
    }*/,

  },
  {

    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#2D3245',
      activeBackgroundColor: 'orange',
      style: {
        backgroundColor: 'white',
        //backgroundColor: '#2D3245'
      },
      initialRouteName: 'Homescreen',
    }

  }
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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
    flex: 1,
    padding: 0,
    backgroundColor: '#2D3245'
  },
  textStyleHomescreen: {
    paddingTop: 8,
    paddingLeft: 15,
    paddingBottom: 8,
    fontSize: 27,
    color: '#2D3245',

  }
});
