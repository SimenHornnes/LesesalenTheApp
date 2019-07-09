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
      hoursAllTime: 0,
      hoursSemester: 0,
      hoursWeekly: 0,
      userId: undefined,
      buttonPressed: false,
      acceptButton: false,
    }
  }


  //Får noken millisekund rendering time pga må hente fra firebase databasen, 
  //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
  componentWillMount() {

    const { currentUser } = firebase.auth()
    if (currentUser != null) {
      const recentPost = firebase.database().ref(`users/${currentUser.uid}`);
      recentPost.once('value').then(snapshot => {
        this.setState({ userId: currentUser.uid, username: currentUser.displayName, hoursAllTime: snapshot.val().hoursAllTime, hoursSemester: snapshot.val().hoursSemester, hoursWeekly: snapshot.val().hoursWeekly })
      }
      )

      this.props.navigation.setParams({
        username: currentUser.displayName
      })
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    const ref = firebase.database().ref(`users/${currentUser.uid}`);
    ref.on('child_changed', (snapshot) => {
      const key = snapshot.key;
      if (key === 'hoursAllTime' || key === 'hoursSemester' || key === 'hoursWeekly') {
        const obj = {}
        obj[key] = snapshot.val();
        this.setState(obj);
      }
    })
  }


  setProfilePic() {
    if (this.state.profilePic != null) {

      if (this.state.userId) {
        firebase.database().ref(`userPictures/${this.state.userId}`).update({
          photoURL: this.state.profilePic
        }).then(() => {
          this.setState({ profilePic: this.state.profilePic, profilepiccheck: false, buttonPressed: false })
        }).catch((err) => {
          console.error(err)
        })
      }
      else { this.setState({ buttonPressed: true }) }
    }
    else { this.setState({ buttonPressed: false }) }
  }

  fetchProfilePic() {
    const recentPost = firebase.database().ref(`userPictures/${this.state.userId}`);
    recentPost.once('value').then(snapshot => {
      this.setState({ profilePic: snapshot.val().photoURL, profilepiccheck: true })
    }

    ).catch(err => {
      this.setState({ profilePic: "https://cdn.pixabay.com/photo/2018/04/22/22/57/hacker-3342696_1280.jpg", profilepiccheck: true })
    })
  }

  render() {
    if (this.state.userId && !this.state.profilepiccheck) {
      this.fetchProfilePic()
    }

    if (this.state.userId && this.state.profilepiccheck && this.state.username) {
      return (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + 20}
          style={{
            backgroundColor: '#2D3245', flex: 1, width: Dimensions.get('window').width,
            height: Dimensions.get('window').height, justifyContent: 'center'
          }}
          behavior='padding'
        >
          <View>
            <View style={styles.hourStyles}>
              <View style={{ width: '33%' }}>
                <Text style={[styles.textStyleHomescreen, { fontSize: 20 }]}>Alltime:</Text>
                <View style={styles.hStyle}>
                  <Text style={styles.textStyleHomescreen}>{Math.trunc(this.state.hoursAllTime / 60)}</Text>
                  <Text style={[styles.textStyleHomescreen2, { fontSize: 10 }]}>h </Text>
                  <Text style={styles.textStyleHomescreen}> {(this.state.hoursAllTime % 60)}</Text>
                  <Text style={[styles.textStyleHomescreen2, { fontSize: 10 }]}> min</Text>
                </View>
              </View>
              <View style={{ width: '33%' }}>
                <Text style={[styles.textStyleHomescreen, { fontSize: 20 }]}>Semester:</Text>
                <View style={styles.hStyle}>
                  <Text style={styles.textStyleHomescreen}>{Math.trunc(this.state.hoursSemester / 60)}</Text>
                  <Text style={[styles.textStyleHomescreen2, { fontSize: 10 }]}>h </Text>
                  <Text style={styles.textStyleHomescreen}> {(this.state.hoursSemester % 60)}</Text>
                  <Text style={[styles.textStyleHomescreen2, { fontSize: 10 }]}> min</Text>

                </View>
              </View>
              <View style={{ width: '33%' }}>
                <Text style={[styles.textStyleHomescreen, { fontSize: 20 }]}>Weekly:</Text>
                <View style={styles.hStyle}>
                  <Text style={styles.textStyleHomescreen}>{Math.trunc(this.state.hoursWeekly / 60)}</Text>
                  <Text style={[styles.textStyleHomescreen2, { fontSize: 10 }]}>h </Text>
                  <Text style={styles.textStyleHomescreen}> {(this.state.hoursWeekly % 60)}</Text>
                  <Text style={[styles.textStyleHomescreen2, { fontSize: 10 }]}> min</Text>
                </View>
              </View>
            </View>


            <TouchableHighlight underlayColor='white' activeOpacity={0.9} onLongPress={() => { this.setState({ buttonPressed: true }) }} style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center", width: 340, height: 340, borderRadius: 50,
            }}>


              {this.state.profilePic ? (<Image source={{ uri: this.state.profilePic }} style={{ resizeMode: 'contain', minWidth: 340, minHeight: 340, padding: 10, borderRadius: 50, }} />) : (<Text style={{ color: "white", fontSize: 12 }}>Long press to add picture, must be on the format 'https://i.imgur.com/dwH1H2M.jpg'</Text>)}




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
            {this.state.buttonPressed ? (<Button title="Accept change" onPress={() => { this.setProfilePic() }} />) : null}





            <View >
              <Button buttonStyle={{ backgroundColor: "orange", borderRadius: 8, minWidth: '90%', alignSelf: 'center' }}

                title="SIGN OUT"
                onPress={() => (firebase.auth().signOut())}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      )
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D3245' }}>
          <Text style={{ color: 'white' }}> Waiting for data...</Text>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  textStyleHomescreen: {
    fontSize: 17,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  hourStyles: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hStyle: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textStyleHomescreen2: {
    fontSize: 17,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: '1%'
  },
});