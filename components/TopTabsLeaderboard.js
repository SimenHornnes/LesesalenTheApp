import React, {Component} from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



class LeaderboardUpdate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      highScoreList: [] 
    }
  }
  getHighscoreList = () => {
    fetch("https://lesesalentheapp.firebaseio.com/places.json")
      .then(res => res.json())
      .then(parsedRes => {
        const hList = ['hei'];
        for (const key in parsedRes) {
          hList.push({
            navn: parsedRes[key].lat
          });
        }
        this.setState({
          highScoreList: hList
        })
      })
      .catch(err => Console.log(err));
  };

  render() {
    return (
      <View>
        <Text style={{fontWeight: 'bold', ...styles.fontsize}}>
          {this.props.title}
        </Text>
        {this.state.highScoreList.map(name => <Text key = {name} style = {{textAlign: 'center', marginBottom: 10}}>{name}</Text>)}
      </View>
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
    fontSize: 50
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
