
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
import SettingsScreen from './components/SettingsScreen'
import ChangeUsername from './components/ChangeUsername'
import ChangePassword from './components/ChangePassword'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {colorObject} from './components/ColorConfig'

const sizeOfIcons = 32;


_menu = null;

setMenuRef = ref => {
  _menu = ref;
};

hideMenu = () => {
  _menu.hide();
};

showMenu = () => {
  _menu.show();
};

const LeaderBoardWrapperView = createStackNavigator(
  {
    Leaderboard: {
      screen: Leaderboard = createMaterialTopTabNavigator({
        Alltime: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="hoursAllTime" />,
        Semester: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="hoursSemester"/>,
        Weekly: ({ navigation }) =>
          <AllTimeLeaderBoard navigation={navigation} path="hoursWeekly"/>,
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
              backgroundColor: colorObject.TopBarColor,
            }
          },
          navigationOptions: ({ navigation }) => {
            
          }

        }
      ),

      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: <View ><Text style={{ fontSize: 20, color: colorObject.TopBarIconsAndTextColor, paddingLeft: '4%', paddingTop: '3%' }}>Leaderboard</Text></View>,
          headerStyle: {
            elevation: 0, // remove shadow on Android,
            backgroundColor: colorObject.TopBarColor,
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerRight: (<View style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: 120
          }}>
            <Icon name='md-search' size={sizeOfIcons - 3} style={{ color: colorObject.TopBarIconsAndTextColor, paddingRight: 14 }} onPress={() => { navigation.navigate('SettingsScreen'), { navigation } }} />

            <Menu
              ref={this.setMenuRef}
              button={<Text onPress={this.showMenu}><Icon name='md-menu' size={sizeOfIcons - 3} style={{ color: colorObject.TopBarIconsAndTextColor }} /></Text>}
            >
              <MenuItem onPress={() => { this.hideMenu(); navigation.navigate('Semester', {sortpath: 'hoursSemester', section: 'users/'}); navigation.navigate('Weekly', {sortpath: 'hoursWeekly', section: 'users/'}); navigation.navigate('Alltime', {sortpath: 'hoursAllTime', section: 'users/'});  }}>Hours</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); navigation.navigate('Semester', {sortpath: 'before8Semester', section: 'achievements/'}); navigation.navigate('Weekly', {sortpath: 'before8Weekly', section: 'achievements/'}); navigation.navigate('Alltime', {sortpath: 'before8AllTime', section: 'achievements/'}); }}>Before8</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); navigation.navigate('Semester', {sortpath: 'streakSemester', section: 'users/'}); navigation.navigate('Weekly', {sortpath: 'streakWeekly', section: 'users/'}); navigation.navigate('Alltime', {sortpath: 'streakAllTime', section: 'users/'});  }}>Streak</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); navigation.navigate('Semester', {sortpath: 'weeklywinnerSemester', section: 'achievements/'}); navigation.navigate('Weekly', {sortpath: 'weeklywinner', section: 'achievements/'}); navigation.navigate('Alltime', {sortpath: 'weeklywinnerAllTime', section: 'achievements/'}); }}>WeeklyWinner</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); navigation.navigate('Semester', {sortpath: 'semesterwinner'}); navigation.navigate('Weekly', {sortpath: 'semesterwinner'}); navigation.navigate('Alltime', {sortpath: 'semesterwinner'});  }}>SemesterWinner</MenuItem>
            </Menu>
          </View>)
        }
      }
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('e2', 'NO-ID') + "'s profile"
      })
    },
  },

  {
    initialRouteName: 'Leaderboard',
    defaultNavigationOptions: {
      gesturesEnabled: true,
      headerTintColor: colorObject.TopBarIconsAndTextColor,
      headerStyle: {
        backgroundColor: colorObject.TopBarColor,
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
              fontSize: 14,
              fontWeight: '300'
            },
            indicatorStyle: { backgroundColor: 'white' },
            activeTintColor: 'white',
            inactiveTintColor: '#2D3245',
            style: {
              backgroundColor: colorObject.TopBarColor
            }
          },
          navigationOptions: ({ navigation }) => {
            const { routes = [] } = navigation.state;
            let username = ''
            if (routes && routes[0].params && routes[0].params.username) {
              username = routes[0].params.username
            }

            return {
              headerTitle: <View ><Text style={{ fontSize: 20, color: colorObject.TopBarIconsAndTextColor, paddingLeft: '4%', paddingTop: '3%' }}>{username}</Text></View>,
              headerStyle: {
                elevation: 0, // remove shadow on Android,
                backgroundColor: colorObject.TopBarColor,
                shadowOpacity: 0, // remove shadow on iOS

              },
              headerRight: <Icon name='md-settings' size={sizeOfIcons - 3} style={{ color: colorObject.TopBarIconsAndTextColor, paddingRight: 14 }} onPress={() => { navigation.navigate('SettingsScreen'), { navigation } }} />
            }
          }
        }
      ),
    },

    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        headerTitle: <View ><Text style={{ fontSize: 20, color: colorObject.TopBarIconsAndTextColor }}>Settings</Text></View>,

      }
    },
    ChangeUsername: {
      screen: ChangeUsername,
      navigationOptions: {
        headerTitle: <View ><Text style={{ fontSize: 20, color: colorObject.TopBarIconsAndTextColor }}>Change Username</Text></View>,

      }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        headerTitle: <View ><Text style={{ fontSize: 20, color: colorObject.TopBarIconsAndTextColor }}>Change Password</Text></View>,

      }
    },
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      gesturesEnabled: true,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: colorObject.TopBarColor,
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
        tabBarIcon: () => { return (<Icon name="md-home" size={sizeOfIcons} color={colorObject.BottomBarIconsColor} />) },
      }
    },
    Leaderboard: {
      screen: LeaderBoardWrapperView,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name="md-list" size={sizeOfIcons} color={colorObject.BottomBarIconsColor} />) },
      }
    },
    Profile: {
      screen: profileWrapperView,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name='md-person' size={sizeOfIcons} color={colorObject.BottomBarIconsColor} />) }
      }
    },
  },
  {
    tabBarOptions: {
      keyboardHidesTabBar: true,
      showLabel: false,
      activeTintColor: '#2D3245',
      activeBackgroundColor: 'orange',
      style: {
        backgroundColor: colorObject.BottomBarColor,
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
