
import firebase from 'firebase/app';
import { StyleSheet, Text, View, StatusBar, PermissionsAndroid, WebView } from 'react-native';
import "firebase/database";
import LesesalProgram from './lesesalprogram'
import React from 'react';
import {colorObject} from './ColorConfig'
import FtueScreen from '../WelcomeScreen';



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
      <View style={styles.HomescreenStyle }>
        <View>
          <FtueScreen pagekey={this.props.navigation.state.key} title={"ReadMe"} description={
            `Smartphones are turning back into dumbphones. To squeeze a little extra battery out of your phone, phone manufacturers automatically turn off many important background services. This effectively kills our app, whose aim it is to track whether or not you are at school in the background (when the app is closed). To enable our app to work as intended, go into your phone settings -> battery -> App-Launch and then enable manual control over this app. This may vary from phone to phone.`}/>
      </View>
        <StatusBar backgroundColor="#D2922D" barStyle="light-content" />
        <View style={{ backgroundColor: colorObject.TopBarColor, paddingTop: '3%', paddingBottom: '2%' }}><Text style={styles.textStyleHomescreen}>Calendar</Text></View>
        <View style={{ height: '100%', marginBottom: 30, }}>{isDataSourceLoaded ? (<LesesalProgram data={this.state.dataSource} navigation={this.props.navigation} />) : ((<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorObject.PrimaryColor }}>
          <Text style={{ color: colorObject.TertiaryColor }}> Waiting for data...</Text>
        </View>))}</View>
      </View>
    );
    /*return (
      <WebView
        source={{uri: 'https://www.kongsberg.com/'}}
        style={{marginTop: 20}}
      />
    );*/
  }
}


const styles = StyleSheet.create({
  HomescreenStyle: {
    flex: 1,
    backgroundColor: colorObject.PrimaryColor
  },
  textStyleHomescreen: {
    paddingTop: 8,
    paddingLeft: 15,
    paddingBottom: 8,
    padding: 20,
    fontSize: 20,
    color: colorObject.TopBarIconsAndTextColor,
  }
});