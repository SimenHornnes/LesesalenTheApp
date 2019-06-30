import React from 'react';
import { View, Dimensions, StyleSheet, TouchableHighlight, Image } from 'react-native';
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
      userId: undefined,
    }
  }


  //Får noken millisekund rendering time pga må hente fra firebase databasen, 
  //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
  componentWillMount() {

    const { currentUser } = firebase.auth()
    console.log(currentUser)
    if (currentUser != null) {
      const recentPost = firebase.database().ref(`allTime/${currentUser.uid}/hours`);
      recentPost.once('value').then(snapshot => {
        this.setState({ userId: currentUser.uid, username: currentUser.displayName, hours: snapshot.val() })

      }
      )

    }
  }


  setProfilePic() {
    if (this.state.userId) {
      var input = ""
      firebase.database().ref(`userPictures/${this.state.userId}`).update({
        photoURL: "https://i.imgur.com/wBIga8z.jpg" //input denne
      }).then(() => {
        this.setState({ profilePic: "https://i.imgur.com/wBIga8z.jpg" })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  fetchProfilePic() {
    const recentPost = firebase.database().ref(`userPictures/${this.state.userId}`);
    recentPost.once('value').then(snapshot => {
      this.setState({profilePic: snapshot.val().photoURL, profilepiccheck: true})
    }

    )
  }







  /*fetchingHours() {
    console.log("henter hours")
    const recentPost = firebase.database().ref(`users/${this.state.userId}/hours`);
    recentPost.once('value').then(snapshot => {
      this.setState({ hours: snapshot.val() })
    })
  }*/


  render() {
    console.log(this.state.profilePic)
    if (this.state.userId && !this.state.profilepiccheck) {
      this.fetchProfilePic()
    }

    return (
      <View style={{ paddingVertical: 20, backgroundColor: '#2D3245', height: '100%' }}>
        <Text style={styles.textStyleHomescreen}>{this.state.username}</Text>
        <Text style={styles.textStyleHomescreen}>{this.state.hours}</Text>
        <TouchableHighlight underlayColor='orange' activeOpacity={0.5} onPress={() => { this.setProfilePic() }} style={{
          borderColor: 'black',
          alignItems: "center",
          justifyContent: "center",
          width: 240,
          height: 240,
          borderRadius: 50,
          alignSelf: "center",
        }}>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 240,
              height: 240,
              borderRadius: 50,
              alignSelf: "center",
            }}
          >
            {this.state.profilePic ? (<Image source={{ uri: this.state.profilePic }} style={{ resizeMode: 'stretch', width: 240, height: 240, padding: 10, borderRadius: 50, }} />) : (<Text style={{ color: "white", fontSize: 12 }}>Press to add picture, must be on the format 'https://i.imgur.com/dwH1H2M.jpg'</Text>)}



          </View>
        </TouchableHighlight>


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
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 15
  }
});