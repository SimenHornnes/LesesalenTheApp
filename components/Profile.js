import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { onSignOut } from '../Auth';
import firebase from 'firebase/app';
import { withNavigation } from 'react-navigation';


export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: undefined,
      profilePic: undefined,
      hours: 0,
      userId: undefined
    }
  }


  //Får noken millisekund rendering time pga må hente fra firebase databasen, 
  //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
  componentWillMount() {
    if (!(this.state.userId && this.state.username)) {
      const { currentUser } = firebase.auth()
      //console.log(currentUser)

      const recentPost = firebase.database().ref(`allTime/${currentUser.uid}/hours`);
      recentPost.once('value').then(snapshot => {
        this.setState({ userId: currentUser.uid, username: currentUser.displayName, hours: snapshot.val() })
      })
    }
  }

  /*fetchingHours() {
    console.log("henter hours")
    const recentPost = firebase.database().ref(`users/${this.state.userId}/hours`);
    recentPost.once('value').then(snapshot => {
      this.setState({ hours: snapshot.val() })
    })
  }*/


  render() {
    return (
      <View style={{ paddingVertical: 20, backgroundColor: '#2D3245', height: '100%' }}>
        <Text style={styles.textStyleHomescreen}>{this.state.username}</Text>
        <Text style={styles.textStyleHomescreen}>{this.state.hours}</Text>
        <View
          style={{
            backgroundColor: "#bcbec1",
            alignItems: "center",
            justifyContent: "center",
            width: 240,
            height: 240,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 28 }}>ProfilePic</Text>
        </View>


        <View style={{ paddingTop: 5 }}>
          <Button buttonStyle={{ backgroundColor: "orange", borderRadius: 40, minWidth: '90%', alignSelf: 'center' }}

            title="SIGN OUT"
            onPress={() => (firebase.auth().signOut())}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textStyleHomescreen: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 25
  }
});