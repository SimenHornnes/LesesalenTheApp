import React from 'react';

import { createRootNavigator } from './Router'
//import { isSignedIn } from './Auth'
import firebase from 'firebase/app'
import { createAppContainer } from 'react-navigation';
import { YellowBox } from 'react-native';
import Loading from './Loading'
//Blir ikke brukt i koden, men initialiserer firebasedatabasen
import { Firebase } from './components/src/Config';
import BackgroundFetch from "react-native-background-fetch";


export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: true,
      checkedSignIn: false,
      isOnLesesalen: false,
      time: undefined,
    };
  }
  /*ShowAlertWithDelay = () => {

    setTimeout(function () {
      console.log("Hellothere")

      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      Alert.alert("Alert Shows After 5 Seconds of Delay.")
    }, 3000);
  }
*/


  componentDidMount() {
    // Configure it.
    BackgroundFetch.configure({
      minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
      // Android options
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, () => {
      console.log("[js] Received background-fetch event");
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      const { currentUser } = firebase.auth()

      navigator.geolocation.getCurrentPosition(position => {
        
      


      isInside = (radius = 9999999999) => {
        const R = 6371000;
        if (!position) {
          //console.log("No position!")
          return false;
        }
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        console.log("This is the latitude: ", lat)
        console.log("This is the longitude: ", lng)

        //const lat = 60.382186;
        //const lng = 5.332215;
        const lesesalenLat = 60.4595623;
        const lesesalenLng = 5.3279822;
        const radians = Math.PI / 180.0;
        const rlesesalenLat = lesesalenLat * radians;
        const rlat = lat * radians;
        const triLat = Math.abs(lat - lesesalenLat) * radians;
        const triLong = Math.abs(lesesalenLng - lng) * radians;

        const a = (Math.sin(triLat / 2) * Math.sin(triLat / 2)) + (Math.cos(lesesalenLat * radians) * Math.cos(lat * radians) * Math.sin(triLong / 2.0) * Math.sin(triLong / 2.0));
        //console.log(a)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //console.log(c)
        const answer = R * c
        //console.log(answer)
        if (answer > radius) {
          return false;
        }
        console.log("Returned true")
        return true;
      }

      let date = new Date().getDate(); //Current Date
      let month = new Date().getMonth() + 1; //Current Month
      let year = new Date().getFullYear(); //Current Year
      let hours = new Date().getHours(); //Current Hours
      let min = new Date().getMinutes(); //Current Minutes

      console.log(month)

      let time = {
        date: date,
        month: month,
        year: year,
        hours: hours,
        min: min,
      }


      if (currentUser.uid) {
        console.log('THERE IS A USER!')
        if (isInside()) {
          if (this.state.isOnLesesalen) {
            let differenceInTime = ((time.hours - this.state.time.hours) * 60 + (time.min - this.state.time.min))
            console.log("The difference in time is: ", differenceInTime)
            const recentPost = firebase.database().ref(`allTime/${currentUser.uid}/hours`);
            recentPost.once('value').then(snapshot => {
              firebase.database().ref(`allTime/${currentUser.uid}`).update({
                hours: snapshot.val() + differenceInTime,
                haveBeenToSchool: true,
              })
              //this.setState({ hours: snapshot.val() + 100 })
            })
          }
          this.setState({
            isOnLesesalen: true,
            time: time
          })
        }
        else {
          console.log("NOT INSIDE")
          this.setState({
            isOnLesesalen: false,
          })
        }
      }
      else {
        console.log('THERE IS NOT A USER!')
      }
    }, err => console.log(err));
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
    //Det er en mulig feil her når vi loada appen, den blir berre aktivert viss man dobbelttrykke eller staten blir endra
    firebase.auth().onAuthStateChanged(user => {
      //console.log("Changed auth state")
      //console.log(user)
      if (user) {
        this.setState({ signedIn: true, checkedSignIn: true })
      }
      else {
        this.setState({ signedIn: false, checkedSignIn: true })
      }
    });
  }

  render() {
    //console.log(this.state)
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
    YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted from react-native core']);
    YellowBox.ignoreWarnings(['Warning: Encountered two children with the same key']);
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['Remote debugger']);

    const { checkedSignIn, signedIn } = this.state;


    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return <Loading />;
    }

    const Temp = createRootNavigator(signedIn);
    const FinalApp = createAppContainer(Temp);
    return <FinalApp />;
  }
}

