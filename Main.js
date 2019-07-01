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
      checkedSignIn: false,
      username: null,
      emailVerified: false
    };
  }
 


  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      //console.log("Changed auth state")
      console.log(user)
      //if (user.displayName) {
      if (user) {
        console.log(user.emailVerified)
        if (user.emailVerified == true) {
          console.log("hellofromauthstate")
          this.setState({ signedIn: true, checkedSignIn: true, username: user.displayName, emailVerified: true })
        }
        else {
          
          this.setState({ signedIn: false, checkedSignIn: true, username: user.displayName, emailVerified: false })
        }
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

    if (this.state.username != null && this.state.emailVerified == true) {
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
  }*/