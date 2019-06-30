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

    componentWillMount(){
        const { navigation } = this.props;
        //console.log(navigation)
        const uid = navigation.getParam('userId', 'NO-ID');
        if (!this.state.userId) {
            this.setState({ userId: uid })
        }
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



    render() {
        
        if(this.state.userId && !this.state.username){
            this.fetchData()
        }
        if(this.state.username && this.state.hours){
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

            </View>
        )
                }
                else{
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