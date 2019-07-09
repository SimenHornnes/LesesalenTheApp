
import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/app';
import "firebase/database";
import Achievements from './components/Achievements';
import AllTimeLeaderBoard from './components/AllTimeLeaderBoard';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import DetailScreen from './components/DetailScreen'
import Homescreen from './components/HomeScreen'
const sizeOfIcons = 32;

const LeaderBoardWrapperView = createStackNavigator(  
  {
    Leaderboard: {
      screen: Leaderboard = createMaterialTopTabNavigator({
        //THANK YOU SAEED
        Alltime: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="hoursAllTime" />,
        Semester: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="hoursSemester" />,
        Weekly: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="hoursWeekly" />,
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
        headerTitle: <View ><Text style={{ fontSize: 20, color: 'white', paddingLeft: '4%', paddingTop: '3%' }}>Leaderboard</Text></View>,
        headerStyle: {
          elevation: 0, // remove shadow on Android,
          backgroundColor: 'orange',
          shadowOpacity: 0, // remove shadow on iOS
        },
      }
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions:({navigation}) => ({
          title: navigation.getParam('e2', 'NO-ID')+"'s profile"
      })
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
        Profile: (props) => <Profile {...props} />,
        Achievements: () => <Achievements />,
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
          },
          navigationOptions: ({ navigation }) => {
            const { routes = [] } = navigation.state;
            let username = ''
            if (routes && routes[0].params && routes[0].params.username) {
              username = routes[0].params.username
            }

            return {
              headerTitle: <View ><Text style={{ fontSize: 20, color: 'white', paddingLeft: '4%', paddingTop: '3%' }}>{username}</Text></View>,
              headerStyle: {
                elevation: 0, // remove shadow on Android,
                backgroundColor: 'orange',
                shadowOpacity: 0, // remove shadow on iOS

              },
            }
          }
        }
      ),
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

export const SignedOut = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
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
      screen: (props) => <Homescreen {...props} />,
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
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#2D3245',
      activeBackgroundColor: 'orange',
      style: {
        backgroundColor: 'white',
      },
      initialRouteName: 'Homescreen',
    }

  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        params: { allUsers: 'fuck yes' }
      },
      SignedOut: SignedOut,
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
