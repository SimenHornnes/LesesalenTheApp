import React, {Component} from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import {Platform, StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
//import { List, ListItem } from 'react-native-elements'

const { height } = Dimensions.get('window'); 

export default class Scroll extends React.Component {
  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  
  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={styles.container1}>
        <StatusBar barStyle="light-content" backgroundColor="#468189" />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.content}>
            {this.props.children}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const TopTabNavigator = createMaterialTopTabNavigator(
  {
    Alltime: { 
      screen: Scroll,
      navigationOptions: {
          tabBarIcon: () => { return (<Icon name="md-home" size = {sizeOfIcons} color = '#0097A7' />)},
        } 
    },
    Semester: { 
      screen: Scroll,
      navigationOptions: {
        tabBarIcon: () => { return (<Icon name = "md-list" size = {sizeOfIcons} color = '#0097A7' />)}
      } 
    },
    Weekly: {
      screen: Scroll,
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



//export default LeaderboardUpdate;

//export default createAppContainer(TopTabNavigator);

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#85D4E7",
  },
  scrollview: {
    flexGrow: 1,
  },
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
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
});
