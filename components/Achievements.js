import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import firebase from 'firebase/app';


export default class Achievements extends React.Component {
    _isMounted = false
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
    componentDidMount() {
        this._isMounted = true
        const { currentUser } = firebase.auth()

        if (currentUser != null && this._isMounted) {
            this.setState({ userId: currentUser.uid })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    /*componentDidMount() {
        if (this.state.userId != null) {
            this.fetchAchievements()
        }
    }*/

    fetchAchievements() {
        if (this.state.userId != null) {
            const recentPost = firebase.database().ref(`achievements/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                this.setState({ achievementsObject: snapshot.val() })
            })
        }
    }





    render() {
        if (this.state.userId && !this.state.achievementsObject) {
            this.fetchAchievements()
        }
        isDataloaded = this.state.userId != null
        isAchievementObjectLoaded = this.state.achievementsObject != null


        if (isDataloaded) {
            return (
                <View style={{ paddingVertical: 20, backgroundColor: '#2D3245', height: '100%' }}>
                    <Text style={styles.textStyleHomescreen}>Achievements</Text>
                    <View
                        style={{ alignItems: 'center' }}>

                        {isAchievementObjectLoaded ? (Object.keys(this.state.achievementsObject).map(achievement =>
                            <Text key={achievement} style={{ color: "white", fontSize: 28 }}>{achievement}{this.state.achievementsObject[achievement] ? (null) : " x" + (this.state.achievementsObject[achievement])}</Text>)) : (<Text style={{ color: 'white' }}>You have no achievements</Text>)}


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



const lol = () => {
    const ref = firebase.database().ref(`achievements/${this.state.userId}`);
    ref.forEach(achievementType => {
        <View><Text>{achievementType.name}</Text></View>
        achievementType.forEach(achievement => {
            <View>
                <Image link={achievement.image}></Image>
                <Text>{achievement.name}</Text>
            </View>
        })

    })
}