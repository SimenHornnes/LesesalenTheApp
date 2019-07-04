import React from 'react';
import { View, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
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
            profilepiccheck: false,
            achievementsObject: null,
        }
    }

    componentWillMount() {
        const { navigation } = this.props;
        const uid = navigation.getParam('userId', 'NO-ID');
        if (!this.state.userId) {
            this.setState({ userId: uid })
        }
    }

    fetchProfilePic() {
        const recentPost = firebase.database().ref(`userPictures/${this.state.userId}`);
        recentPost.once('value').then(snapshot => {
            if (snapshot.val().photoURL != null) {
                this.setState({ profilePic: snapshot.val().photoURL, profilepiccheck: true })
            }
            else {
                this.setState({ profilePic: null, profilepiccheck: true })
            }
        }

        ).catch((err) => {
            this.setState({profilepiccheck: true})
            console.log(err)
        })
    }


    //Får noken millisekund rendering time pga må hente fra firebase databasen, 
    //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
    fetchData() {
        if (this.state.userId) {
            const recentPost = firebase.database().ref(`allTime/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                this.setState({ username: snapshot.val().name, hours: snapshot.val().hours })
            })
        }
    }
    fetchAchievements() {
        if (this.state.userId != null) {
            const recentPost = firebase.database().ref(`achievements/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                this.setState({ achievementsObject: snapshot.val() })
            })
        }
    }



    render() {
        const doesUserHavePicture = this.state.profilePic != null
        if (this.state.userId && !this.state.profilepiccheck && !this.state.profilePic) {
            this.fetchProfilePic()
        }
        if (this.state.userId && !this.state.achievementsObject) {
            this.fetchAchievements()
        }
        if (this.state.userId && !this.state.username) {
            this.fetchData()
        }
        isAchievementObjectLoaded = this.state.achievementsObject != null
        if (this.state.profilepiccheck) {
            return (
                <ScrollView style={styles.dataWrapper} >
                <View style={{ paddingVertical: 20, backgroundColor: '#2D3245', height: '100%' }}>
                   
                    <Text style={styles.textStyleHomescreen}>{this.state.username}</Text>
                    <Text style={styles.textStyleHomescreen}>{this.state.hours}</Text>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 240,
                            height: 240,
                            borderRadius: 50,
                            alignSelf: "center",
                            marginBottom: 20
                        }}
                    >
                        {doesUserHavePicture ? (<Image source={{ uri: this.state.profilePic }} style={{ resizeMode: 'stretch', width: 240, height: 240, padding: 10, borderRadius: 50, }} />) : (<Text style={{ color: "white", fontSize: 12 }}>Tell this user to get a profile picture</Text>)}
                    </View>

                    <Text style={styles.textStyleHomescreen}>Achievements</Text>
                    <View
                        style={{ alignItems: 'center' }}>

                        {isAchievementObjectLoaded ? (Object.keys(this.state.achievementsObject).map(achievement =>

                            <Text style={{ color: "white", fontSize: 28 }}>{achievement}{this.state.achievementsObject[achievement] === true ? (null) : " x" + (this.state.achievementsObject[achievement])}</Text>)) : (<Text>You have no achievements</Text>)}


                    </View>
                    
                </View>
                </ScrollView>
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
        fontSize: 30,
        color: 'white',
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 25
    },
    dataWrapper: { marginTop: -1 },
});