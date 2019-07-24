import React from 'react';
import { View, Dimensions, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { onSignOut } from '../Auth';
import firebase from 'firebase/app';
import {colorObject} from './ColorConfig'
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
            achievementsurl: [],

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
        firebase.database().ref('/achievementsurl').once('value', snapshot => {
            let temparr = {}

            snapshot.forEach(userSnapshot => {
                var key = userSnapshot.key;
                temparr[key] = userSnapshot.val()


            })
            this.setState({ achievementsurl: temparr })

        })


        if (this.state.userId != null && this.state.achievementsurl) {
            const recentPost = firebase.database().ref(`achievements/${this.state.userId}`);
            recentPost.once('value').then(snapshot => {
                let urllist = []
                snapshot.forEach(userSnapshot => {
                    if(userSnapshot.key !== 'name' && userSnapshot.val() !== 0 && userSnapshot.key !== 'before8Weekly'&& userSnapshot.key !== 'before8Semester'&&  userSnapshot.key !== 'weeklywinnerAllTime'){
                    urllist.push({
                        name: userSnapshot.key,
                        value: userSnapshot.val(),
                        link: this.state.achievementsurl[userSnapshot.key]
                    })}
                    //  urllist[this.state.achievementsurl[userSnapshot.key]]= userSnapshot.val()
                })

                this.setState({ achievementsObject: urllist })
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

                    <View style={{ paddingVertical: 20, backgroundColor: colorObject.PrimaryColor }}>
                        <View style={styles.hourStyles}>
                            <View style={{ width: '33%', backgroundColor: '#2D3245', }}>
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


                        {doesUserHavePicture ? (<Image source={{ uri: this.state.profilePic }} style={{
                            resizeMode: 'contain',
                            width: 340, height: 340, borderRadius: 50, padding: 10, alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                        }} />) : (<Text style={{ color: colorObject.TertiaryColor, fontSize: 12 }}>Tell this user to get a profile picture</Text>)}


                        <Text style={styles.textStyleHomescreen}>Achievements</Text>
                        {this.state.achievementsObject ? <FlatList
                            data={Object.keys(this.state.achievementsObject)}
                            numColumns={3}
                            renderItem={({ item }) =>
                                <View style={{ paddingVertical: 20, width: '33.333333%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    {(this.state.achievementsObject[item].value !== true) && (this.state.achievementsObject[item].value !== false) ? <Text style={styles.numTimesWon}>x{this.state.achievementsObject[item].value}</Text>
                                        : <Text style={styles.numTimesWon}></Text>}
                                    <Image source={{ uri: this.state.achievementsObject[item].link }} style={{ resizeMode: 'contain', minWidth: 90, minHeight: 90, maxWidth: 90, maxHeight: 90, borderRadius: 100 }} />
                                    <Text style={styles.item}>
                                        {this.state.achievementsObject[item].name}

                                    </Text>
                                </View>}
                                keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderSeparator}
                        /> : null}

                    </View>
                </ScrollView>
            )
        }
        else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorObject.PrimaryColor }}>
                    <Text style={{ color: colorObject.TertiaryColor }}> Waiting for data...</Text>
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
    dataWrapper: { marginTop: -1, backgroundColor: colorObject.PrimaryColor, },
    textStyleHomescreen: {
        fontSize: 17,
        color: colorObject.TertiaryColor,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    hourStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        color: colorObject.TertiaryColor,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginBottom: '1%'
    },
    item: {
        flex: 1,
        paddingTop: 12,
        fontSize: 12,
        //textAlignVertical: 'center',
        textAlign: 'center',
        color: colorObject.TertiaryColor,

    },
    numTimesWon: {
        paddingRight: 10,
        textAlign: 'right',
        alignSelf: 'stretch',
        color: colorObject.TertiaryColor,
        fontSize: 12,
    }
});