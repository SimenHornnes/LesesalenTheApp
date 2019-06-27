import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import firebase from 'firebase/app';


export default class Achievements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            userId: null,
            achievementsObject: null,

        }
    }


    //Får noken millisekund rendering time pga må hente fra firebase databasen, 
    //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
    componentWillMount() {
        const { currentUser } = firebase.auth()

        console.log(currentUser)
        if (currentUser != null) {
            this.setState({ userId: currentUser.uid })
        }
    }

    componentDidMount(){
        if(this.state.userId != null){
            console.log("hei")
            this.fetchAchievements()
        }
    }

    fetchAchievements() {
        if (this.state.userId != null) {
            const recentPost = firebase.database().ref(`achievements/${this.state.userId}`);
            console.log("fant achievements")
            recentPost.once('value').then(snapshot => {
                console.log(snapshot.val())
                this.setState({achievementsObject: snapshot.val()})
            })
        }
    }

    sendAchievements() {
        /* firebase.database().ref(`achievements/`).set({
             thousandhours: true
         })*/
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



    render() {
        isDataloaded = this.state.userId != null
        isAchievementObjectLoaded = this.state.achievementsObject != null
        if(isAchievementObjectLoaded){
        console.log(this.state.achievementsObject["semesterwinner"])
        }
        console.log(isDataloaded)
        console.log(this.state.userId)
        console.log(this.state.achievementsObject)

        //{this.state.achievementsObject[achievement] vil displaye achievement x0
        if (isDataloaded) {
            return (
                <View style={{ paddingVertical: 20, backgroundColor: '#2D3245', height: '100%' }}>
                    <Text style={styles.textStyleHomescreen}>Achievements</Text>
                    <View
                    style={{alignItems: 'center'}}>
                        
                        {isAchievementObjectLoaded ? (Object.keys(this.state.achievementsObject).map(achievement => 
                            <Text style={{ color: "white", fontSize: 28 }}>{achievement} x{this.state.achievementsObject[achievement]}</Text>)) : (<Text>Loading</Text>)}

                        
                    </View>


                    <View style={{ paddingTop: 40 }}>
                        <Button buttonStyle={{ backgroundColor: "orange", borderRadius: 40, minWidth: '90%', alignSelf: 'center' }}

                            title="Send achievements"
                            onPress={this.sendAchievements()}
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