import React from 'react';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { onSignOut } from '../Auth';
import firebase from 'firebase/app';


export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username: "Heisann",
      profilePic: undefined,
    }
  }

  componentDidMount(){
    const { currentUser } = firebase.auth()
    console.log(currentUser)
    this.setState({username: currentUser.displayName })
  }
  render() {
    console.log(this.state.username)
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={this.state.username}>
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 160,
              height: 160,
              borderRadius: 100,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>ProfilePic</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"

            onPress={() => (this.props.navigation.navigate('SignedOut'), firebase.auth().signOut())}
          />
        </Card>
      </View>
    )
  }
}