
import firebase from 'firebase/app';
import { StyleSheet, Text, View, StatusBar, PermissionsAndroid } from 'react-native';
import "firebase/database";
import LesesalProgram from './lesesalprogram'
import React, { Component } from 'react';


async function requestLocationPermission() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
        },
      );
    } catch (err) {
      console.warn(err);
    }
  }
  
export default class Homescreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        position: undefined,
        inside: false,
        userId: undefined,
        name: undefined,
        funfact: undefined,
        dataSource: [], //for google calender
        pageToken: '',
        error: null,
  
      }
    }
  
    componentWillMount() {
  
      const { currentUser } = firebase.auth()
      if (currentUser != null) {
        this.setState({ userId: currentUser.uid, name: currentUser.displayName })
      }
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
          <StatusBar backgroundColor="#D2922D" barStyle="light-content" />
          <View style={{ backgroundColor: 'orange', paddingTop: '3%', paddingBottom: '2%' }}><Text style={styles.textStyleHomescreen}>Kalender</Text></View>
          <View style={{ height: '100%', marginBottom: 30, }}>{isDataSourceLoaded ? (<LesesalProgram data={this.state.dataSource} />) : (<Text>Loading</Text>)}</View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    HomescreenStyle: {
      flex: 1,
      padding: 0,
      backgroundColor: '#2D3245'
    },
    textStyleHomescreen: {
      paddingTop: 8,
      paddingLeft: 15,
      paddingBottom: 8,
      padding: 20,
      fontSize: 20,
      color: 'white',
    }
  });