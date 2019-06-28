import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import firebase from 'firebase/app';


export default class Achievements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            userId: null,
            achievementsObject: null,
        }
    }


    //Får noken millisekund rendering time pga må hente fra firebase databasen, 
    //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
    async componentWillMount() {
        const { currentUser } = await firebase.auth()

        //console.log(currentUser)
        if (currentUser != null) {
            this.setState({ userId: currentUser.uid })
        }
    }

    componentDidMount() {
        if (this.state.userId != null) {
            this.fetchAchievements()
        }
    }

    fetchAchievements() {
        if (this.state.userId != null) {
            const recentPost = firebase.database().ref(`achievements/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                console.log(snapshot.val())
                this.setState({ achievementsObject: snapshot.val() })
            })
        }
    }


    sendAchievements() {
        /* firebase.database().ref(`achievements/`).set({
             thousandhours: true
         })*/
        console.log("entered send")
        if (this.state.userId != null) {
            const recentPost = firebase.database().ref(`achievements/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                firebase.database().ref(`achievements/${this.state.userId}`).set({
                    thousandhours: 1,
                    semesterwinner: 5,
                    weeklywinner: 19
                })
            })
        }
    }

    //MÅ ENDRAST OM VI SKAL HA ANDRE TING I LEADERBOARD
    streaksetter() {
        console.log("hei")
        const { userId } = this.state.userId
        console.log(userId)
        if (this.state.userId) {
            const allVal = firebase.database().ref(`allTime/${this.state.userId}`);
            allVal.once('value').then(snapshot => {
                const listOfVal = snapshot.val()
                const listOfKeys = Object.keys(snapshot.val())
                console.log(listOfVal)
                if (listOfVal != null) {
                    console.log(listOfVal["haveBeenToSchool"])
                    if (listOfVal["haveBeenToSchool"]) {
                        console.log("Entered if")
                        firebase.database().ref(`allTime/${this.state.userId}`).update({
                            streak: (listOfVal["streak"] + 1),
                            haveBeenToSchool: false
                        })
                    }
                    else {
                        console.log("Entered else")

                        firebase.database().ref(`allTime/${this.state.userId}`).update({
                            streak: 0,
                            haveBeenToSchool: false
                        })
                    }
                }

            })
        }
    }
    /*console.log(snapshot.val())
                console.log(snapshot.val()["streak"])
                firebase.database().ref(`allTime/${this.state.userId}`).update({
                    streak: snapshot.val()["streak"] + 1
                })*/
    /*//Her kan vi bruke lista av keys slik listofVal[key] fra listOfKeys for å få verdien
    const listOfVal = snapshot.val()
    const listOfKeys = Object.keys(snapshot.val())
    console.log(listOfVal)
    if(listOfVal != null){
      console.log(listOfVal["haveBeenToSchool"])
    if(listOfVal["haveBeenToSchool"]){
      console.log("Entered if")
      firebase.database().ref(`allTime/${this.state.userId}`).update({
        streak: (listOfVal["streak"] +1),
        haveBeenToSchool: false
      })
    }
    else{
      console.log("Entered else")
  
      firebase.database().ref(`allTime/${this.state.userId}`).update({
        streak: 10,
        haveBeenToSchool: false
      })
    }
    }*/



    render() {
        isDataloaded = this.state.userId != null
        console.log(this.state.userId)
        isAchievementObjectLoaded = this.state.achievementsObject != null
        if (isAchievementObjectLoaded) {
            // console.log(this.state.achievementsObject["semesterwinner"])
        }
        //  console.log(isDataloaded)
        //console.log(this.state.userId)
        //  console.log(this.state.achievementsObject)

        //{this.state.achievementsObject[achievement] vil displaye achievement x0
        if (isDataloaded) {
            return (
                <View style={{ paddingVertical: 20, backgroundColor: '#2D3245', height: '100%' }}>
                    <Text style={styles.textStyleHomescreen}>Achievements</Text>
                    <View
                        style={{ alignItems: 'center' }}>

                        {isAchievementObjectLoaded ? (Object.keys(this.state.achievementsObject).map(achievement =>
                            <Text style={{ color: "white", fontSize: 28 }}>{achievement} x{this.state.achievementsObject[achievement]}</Text>)) : (<Text>You have no achievements</Text>)}


                    </View>


                    <View style={{ paddingTop: 40 }}>
                        <Button buttonStyle={{ backgroundColor: "orange", borderRadius: 40, minWidth: '90%', alignSelf: 'center' }}

                            title="Send achievements"
                            onPress={this.sendAchievements()}
                        />
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Button buttonStyle={{ backgroundColor: "orange", borderRadius: 40, minWidth: '90%', alignSelf: 'center' }}

                            title="Send achievements"
                            onPress={isDataloaded ? (this.streaksetter.bind(this)) : null}
                        />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View><Text>Loading</Text></View>
            )
        }
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