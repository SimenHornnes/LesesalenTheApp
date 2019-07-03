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
import fetchData from './components/BackgroundFetch'



export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      isOnLesesalen: false,
      time: undefined,
      username: null,
      emailVerified: false
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
      fetchData()
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
      console.log(user)
      //if (user.displayName) {
      if (user) {
        console.log(user.emailVerified)
        //if (user.emailVerified == true) {
          console.log("hellofromauthstate")
          this.setState({ signedIn: true, checkedSignIn: true, username: user.displayName, emailVerified: true })
        //}
       // else {
          
         // this.setState({ signedIn: false, checkedSignIn: true, username: user.displayName, emailVerified: false })
       // }
      }
      else {
        //if no user exist, viktig for signout
        this.setState({ signedIn: false, checkedSignIn: true, username: null, emailVerified: false })
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
    console.log(this.state.username)
    console.log(this.state.emailVerified)

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return <Loading />;
    }

   /* if (this.state.username != null && this.state.emailVerified == true) {
      console.log("Sign in")
      const Temp = createRootNavigator(true);
      const FinalApp = createAppContainer(Temp);
      return <FinalApp />;
    }*/
    
    if (this.state.username != null) {
      console.log("Sign in")
      const Temp = createRootNavigator(true);
      const FinalApp = createAppContainer(Temp);
      return <FinalApp />;
    }
    
    
    else {
      console.log("else")
      const Temp = createRootNavigator(false);
      const FinalApp = createAppContainer(Temp);
      return <FinalApp />;
    }
  }
}



/*render() {
    //console.log(this.state)
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
    YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted from react-native core']);
    YellowBox.ignoreWarnings(['Warning: Encountered two children with the same key']);
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['Remote debugger']);

    const { checkedSignIn, signedIn } = this.state;
    console.log(this.state.username)

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return <Loading />;
    }

    const Temp = createRootNavigator(signedIn);
    const FinalApp = createAppContainer(Temp);
    return <FinalApp />;
  }
}
  }*/
