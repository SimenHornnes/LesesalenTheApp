import React from 'react';
import { View, Dimensions, StyleSheet, Image, ScrollView,  FlatList } from 'react-native';
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
            hoursAllTime: 0,
            hoursSemester: 0,
            hoursWeekly: 0,
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

        ).catch(() => {
            this.setState({ profilepiccheck: true })
        })
    }


    //Får noken millisekund rendering time pga må hente fra firebase databasen, 
    //mulig vi kunne prerendera en anna plass, og passa hours/username som props isteden
    fetchData() {
        if (this.state.userId) {
            const recentPost = firebase.database().ref(`users/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                this.setState({ username: snapshot.val().name, hoursAllTime: snapshot.val().hoursAllTime, hoursSemester: snapshot.val().hoursSemester, hoursWeekly: snapshot.val().hoursWeekly })
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
        if (this.state.profilepiccheck && isAchievementObjectLoaded) {
            return (
                <ScrollView style={styles.dataWrapper} >

                    <View style={{ paddingVertical: 20, backgroundColor: '#2D3245'}}>
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

                        
                        {doesUserHavePicture ? (<Image source={{ uri: this.state.profilePic }} style={{ resizeMode: 'contain', minWidth: 340, minHeight: 340, padding: 10, borderRadius: 50, }} />) : (<Text style={{ color: "white", fontSize: 12 }}>Tell this user to get a profile picture</Text>)}
                        

                        <Text style={styles.textStyleHomescreen}>Achievements</Text>
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
/**<View
                            style={{ alignItems: 'center' }}>

                            {isAchievementObjectLoaded ? (Object.keys(this.state.achievementsObject).map(achievement =>

                                <Text style={{ color: "white", fontSize: 28 }}>{achievement}{this.state.achievementsObject[achievement] === true ? (null) : " x" + (this.state.achievementsObject[achievement])}</Text>)) : (<Text>You have no achievements</Text>)}


                        </View> */
const styles = StyleSheet.create({
    dataWrapper: { marginTop: -1, },
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