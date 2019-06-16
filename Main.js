import React from 'react';

import { createRootNavigator } from './Router'
import { isSignedIn } from './Auth'
import { createAppContainer } from 'react-navigation';

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

    