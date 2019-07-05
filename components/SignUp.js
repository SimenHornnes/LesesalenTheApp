import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from 'firebase/app';

//Evt add epost, og confirm password.
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            displayName: '',
            emailError: null,
            passwordError: null,
            usernameError: null,
            displayCheckMark: false,
            loading: false
        }
    }



    handleSignUp = () => {
        this.setState({
            emailError: null,
            passwordError: null,
            usernameError: null
        })
        if (this.state.displayName.length > 4 && this.state.displayName.length < 16) {
            //The createUserWithEmailAndPassword method returns a UserCredential object. 
            //This is not a User itself, but has a user property, which is a User object.
            const hourList = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo', 'twentythree']
            const hourNumList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
            let date = new Date().getDate();
            let month = new Date().getMonth() + 1;
            let year = new Date().getFullYear();
            let hours = new Date().getHours();
            let min = new Date().getMinutes();
            let time = {
                date: date,
                month: month,
                year: year,
                hours: hours,
                min: min,
            }

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredentials) => {
                    firebase.database().ref(`users/${userCredentials.user.uid}`).set({
                        name: this.state.displayName,
                        hoursAllTime: 0,
                        hoursSemester: 0,
                        hoursWeekly: 0,
                        haveBeenToSchool: false,
                        streak: 0,
                        totalHoursToday: 0,
                        time: time,
                        isOnLesesalen: true,

                    })

                    hourNumList.forEach(num => {
                        firebase.database().ref(`users/${userCredentials.user.uid}/hourOfTheDay/${hourList[num]}`).set({
                            thisHour: false
                        })

                    });
                    firebase.database().ref(`userPictures/${userCredentials.user.uid}`).set({
                        photoURL: "https://cdn.pixabay.com/photo/2018/04/22/22/57/hacker-3342696_1280.jpg"
                    })

                    if (userCredentials.user) {
                        userCredentials.user.sendEmailVerification()
                        userCredentials.user.updateProfile({ displayName: this.state.displayName })
                            .then(() => {
                                firebase.auth().signOut()
                                this.props.navigation.navigate("SignIn")
                            })
                    }
                }).catch((_error) => {
                    if (this.state.email.length == 0) {
                        this.setState({ emailError: "The email address is empty" })
                    } else {
                        if (_error.message == "The email address is badly formatted." || _error.message == "The email address is already in use by another account.") {
                            this.setState({ emailError: _error.message })
                        } else if (_error.message == "Password should be at least 6 characters" || _error.message == "The password must be 6 characters long or more.") {
                            this.setState({ passwordError: _error.message })
                        }
                    }

                })
        }
        else {
            this.setState({ usernameError: "Username must be between 5 and 15 characters long" })
        }
    }

    displayCheckMark = () => {
        if (!(this.state.emailError && this.state.passwordError && this.state.usernameError) && (this.state.displayName.length > 4 && this.state.email.length && this.state.password.length > 5)) {
            this.setState({ displayCheckMark: true })
        } else {
            this.setState({ displayCheckMark: false })
        }
    }

    render() {
        const borderradi = 15
        return (
            <View style={styles.fullsize} >
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: 25,
                        marginBottom: 25
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Join the competition!</Text>
                </View>

                <View
                    style={{
                        marginBottom: 25,
                        alignItems: "center",

                    }}>
                    <Input
                        containerStyle={styles.inputStyling}
                        placeholder='USERNAME'
                        placeholderTextColor='grey'

                        onChangeText={displayName => this.setState({
                            displayName: displayName
                        }, () => {
                            this.displayCheckMark();
                        })}
                        value={this.state.displayName}
                        errorMessage={this.state.usernameError}
                        errorStyle={{ color: 'orange' }}
                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: borderradi }}
                        leftIcon={
                            <Icon
                                name='user'
                                size={32}
                                color='black'
                            />
                        }
                    />
                    <Input
                        containerStyle={styles.inputStyling}
                        placeholder='E-MAIL'
                        placeholderTextColor='grey'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        importantForAutofill='no'

                        onChangeText={email => this.setState({
                            email: email
                        }, () => {
                            this.displayCheckMark();
                        })}
                        value={this.state.email}
                        errorMessage={this.state.emailError}
                        errorStyle={{ color: 'orange' }}

                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: borderradi }}
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        containerStyle={styles.inputStyling}
                        placeholder='PASSWORD' secureTextEntry={true}
                        placeholderTextColor='grey'
                        onChangeText={password => this.setState({
                            password: password
                        }, () => {
                            this.displayCheckMark();
                        })}
                        value={this.state.password}
                        errorMessage={this.state.passwordError}
                        errorStyle={{ color: 'orange' }}
                        shake={true}

                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: borderradi }}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={32}
                                color='black'
                            />
                        }
                    />

                    <Button
                        buttonStyle={{ marginTop: 28, borderRadius: borderradi, backgroundColor: 'orange', width: ((Dimensions.get('window').width) / 100) * 85 }}
                        title="CREATE ACCOUNT"
                        titleStyle={{ fontSize: 22, }}
                        onPress={this.handleSignUp}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputStyling: {
        paddingBottom: 6,
        width: ((Dimensions.get('window').width) / 100) * 90
    },
    fullsize: {
        backgroundColor: '#2D3245',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        paddingHorizontal: 24

    },
})
