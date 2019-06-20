import React from 'react';

import { createRootNavigator } from './Router'
import { isSignedIn } from './Auth'
import { createAppContainer } from 'react-navigation';
import {YellowBox} from 'react-native';

export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    
    }
    
    
    componentDidMount() {
        isSignedIn()
          .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
          .catch(err => alert("HAHA"));
      }
    
      render() {
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
        YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted from react-native core']);
        YellowBox.ignoreWarnings(['Warning: Encountered two children with the same key']);

        const { checkedSignIn, signedIn } = this.state;

    
        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
          return null;
        }
    
        const Temp = createRootNavigator(signedIn);
        const FinalApp = createAppContainer(Temp);
        return <FinalApp />;
      }
    }

    