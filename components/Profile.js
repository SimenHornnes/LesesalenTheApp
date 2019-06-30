import React from 'react';
import { View, Dimensions, StyleSheet, TouchableHighlight, Image, KeyboardAvoidingView } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { onSignOut } from '../Auth';
import firebase from 'firebase/app';
import { withNavigation } from 'react-navigation';
import { Input } from 'react-native-elements';
import { Header } from 'react-navigation';



export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: undefined,
      profilePic: undefined,
      hours: 0,
      userId: undefined,
      buttonPressed: false,
      acceptButton: false,
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
    console.log("setting pic")
    
    if (this.state.userId) {
      var input = ""
      firebase.database().ref(`userPictures/${this.state.userId}`).update({
        photoURL: this.state.profilePic //input denne
      }).then(() => {
        this.setState({ profilePic: this.state.profilePic, profilepiccheck: false, buttonPressed: false })
      }).catch((err) => {
        console.log(err)
      })
    }
    else{this.setState({buttonPressed: true})}
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
    console.log(this.state)
    console.log(this.state.profilePic)
    if (this.state.userId && !this.state.profilepiccheck) {
      this.fetchProfilePic()
    }

    return (
      <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 20}
      style={{ paddingVertical: 20, backgroundColor: '#2D3245', flex:1, width: Dimensions.get('window').width,
      height: Dimensions.get('window').height, justifyContent: 'center' }}
      behavior='padding'
    >
      <View>
        <Text style={styles.textStyleHomescreen}>{this.state.username}</Text>
        <Text style={styles.textStyleHomescreen}>{this.state.hours}</Text>
        <TouchableHighlight underlayColor='white' activeOpacity={0.9} onLongPress={() => { this.setState({buttonPressed: true}) }} style={{
          borderColor: 'black',
          borderWidth: 1,
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
            {this.state.profilePic ? (<Image source={{ uri: this.state.profilePic }} style={{ resizeMode: 'stretch', width: 240, height: 240, padding: 10, borderRadius: 50, }} />) : (<Text style={{ color: "white", fontSize: 12 }}>Long press to add picture, must be on the format 'https://i.imgur.com/dwH1H2M.jpg'</Text>)}



          </View>
        </TouchableHighlight>
        {this.state.buttonPressed ? (<Input
            placeholder=''
            placeholderTextColor='grey'
            onChangeText={profilePic => this.setState({
              profilePic: profilePic
            })}
            value={this.state.profilePic}

            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 40 }}
            
          />) : null}
          {this.state.buttonPressed ? (<Button title= "Accept change" onPress = {() => {this.setProfilePic()}}/>): null }
         


        <View style={{ paddingTop: 30 }}>
          <Button buttonStyle={{ backgroundColor: "orange", borderRadius: 40, minWidth: '90%', alignSelf: 'center' }}

            title="SIGN OUT"
            onPress={() => (firebase.auth().signOut())}
          />
        </View>
      </View>
      </KeyboardAvoidingView>
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