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
      signedIn: false,
      checkedSignIn: false
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

    const pos = navigator.geolocation.getCurrentPosition(position => {
        return position;
    }, err => console.log(err));


    isInside = (radius = 100) => {
        const R = 6371000;
        if (!this.state.position) {
            //console.log("No position!")
            return false;
        }
        const lat = pos.latitude
        const lng = pos.longitude
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
        return true;
    }
    if (currentUser.uid) {
        console.log('THERE IS A USER!')
        if (!isInside()) {
            const recentPost = firebase.database().ref(`allTime/${currentUser.uid}/hours`);
            recentPost.once('value').then(snapshot => {
                firebase.database().ref(`allTime/${currentUser.uid}`).update({
                    hours: snapshot.val() + 15,
                    haveBeenToSchool: true, 
                })
                //this.setState({ hours: snapshot.val() + 100 })
            })
        }
    }
    else {
        console.log('THERE IS NOT A USER!')
    }
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch(status) {
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

