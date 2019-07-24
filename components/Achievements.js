import React from 'react';
import { View, Dimensions, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import firebase from 'firebase/app';
import {colorObject} from './ColorConfig'



export default class Achievements extends React.Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            userId: null,
            achievementsObject: null,
            achievementsurl: [],
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
                    if(userSnapshot.key !== 'name' && userSnapshot.val() !== 0 && userSnapshot.key !== 'before8Weekly'&& userSnapshot.key !== 'before8Semester'&& userSnapshot.key !== 'weeklywinnerAllTime'){
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
        // console.log(this.state.achievementsurl)
        if (this.state.userId && !this.state.achievementsObject) {
            this.fetchAchievements()
        }
        isDataloaded = this.state.userId != null
        isAchievementObjectLoaded = this.state.achievementsObject != null

        if (this.state.achievementsObject) {
            // Object.keys(this.state.achievementsObject).forEach(val => {console.log(val), console.log(this.state.achievementsObject[val])})
        }


        if (isDataloaded && isAchievementObjectLoaded) {
            return (
                <View style={{ backgroundColor: colorObject.PrimaryColor, height: '100%', }}>
                    <ScrollView style={styles.dataWrapper}>
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
        color: colorObject.TertiaryColor,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dataWrapper: { marginTop: -1 },
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



/*
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
*/