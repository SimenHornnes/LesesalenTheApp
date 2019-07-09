import React from 'react';
import { View, Dimensions, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
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


    renderSeparator = () => {
        return (
            <View
                style={{
                    borderBottomWidth: 1,
                    //borderBottomColor: '#7FC3F5',
                    borderBottomColor: '#2D3245',
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };



    render() {
        if (this.state.userId && !this.state.achievementsObject) {
            this.fetchAchievements()
        }
        isDataloaded = this.state.userId != null
        isAchievementObjectLoaded = this.state.achievementsObject != null

        if(this.state.achievementsObject){
        Object.keys(this.state.achievementsObject).forEach(val => {console.log(val), console.log(this.state.achievementsObject[val])})
        }

        //{this.state.achievementsObject[achievement] vil displaye achievement x0
        if (isDataloaded) {
            return (
                <View style={{ backgroundColor: '#2D3245', height: '100%', }}>
                    <ScrollView style={styles.dataWrapper}>
                        {this.state.achievementsObject ? <FlatList
                                data={Object.keys(this.state.achievementsObject)}
                                numColumns={3}
                                renderItem={({ item }) =>
                                <View style={{paddingVertical: 20, width: '33.333333%', flexDirection: 'column', justifyContent:'center', alignContent:'center', alignItems: 'center' }}>
                                    {(this.state.achievementsObject[item] !== true) && (this.state.achievementsObject[item] !== false) ? <Text style = {styles.numTimesWon}>x{this.state.achievementsObject[item]}</Text> : <Text style = {styles.numTimesWon}></Text>}
                                    <Image source={require('../assets/' +'before8' + '.png')} style={{ resizeMode: 'contain', minWidth: 90, minHeight: 90, maxWidth: 90, maxHeight: 90, borderRadius: 100 }} />
                                    <Text style={styles.item}>
                                        {item}
                                        
                                    </Text>
                                    </View>}

                                ItemSeparatorComponent={this.renderSeparator}
                            /> : null}

                        
                           
                    </ScrollView>
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
/* <Image source={require('../assets/before(2).png')} style={{ resizeMode: 'contain', minWidth: 90, minHeight: 90, maxWidth: 90, maxHeight: 90, padding: 10, borderRadius: 100 }} />
                            {isAchievementObjectLoaded ? (Object.keys(this.state.achievementsObject).map(achievement =>

                                <Text style={{ color: "white", fontSize: 28 }}>{achievement}{this.state.achievementsObject[achievement] === true ? (null) : " x" + (this.state.achievementsObject[achievement])}</Text>)) : (<Text>You have no achievements</Text>)}

*/
const styles = StyleSheet.create({
    textStyleHomescreen: {
        fontSize: 30,
        color: 'white',
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dataWrapper: { marginTop: -1 },
    item: {
        flex:1,
        paddingTop: 12,
        fontSize: 12,
        //textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',

    },
    numTimesWon:{
        paddingRight: 10,
        textAlign: 'right',
        alignSelf: 'stretch',
        color: 'white',
        fontSize: 12,
    }

});