import React from 'react';

import { createRootNavigator } from './Router'
//import { isSignedIn } from './Auth'
import firebase from 'firebase/app'
import { createAppContainer } from 'react-navigation';
import { YellowBox } from 'react-native';
import Loading from './Loading'
//Blir ikke brukt i koden, men initialiserer firebasedatabasen
import { Firebase } from './components/src/Config';

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

