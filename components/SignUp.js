import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { onSignIn } from '../Auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Dimensions } from 'react-native';
import firebase from 'firebase/app';
import { TextField } from 'react-native-material-textfield';
import { TextInput } from 'react-native-gesture-handler';


//Evt add epost, og confirm password.
export default class SignUp extends React.Component {
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
        }
    }



    handleSignUp = () => {
        //Limit på lengden av brukernavnet.
        this.setState({
            emailError: null,
            passwordError: null,
            usernameError: null
        })
        if (this.state.displayName.length > 4 && this.state.displayName.length < 15) {
            //The createUserWithEmailAndPassword method returns a UserCredential object. 
            //This is not a User itself, but has a user property, which is a User object.
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredentials) => {
                    if (userCredentials.user) {
                        userCredentials.user.updateProfile({
                            displayName: this.state.displayName
                        }).then((s) => {
                            this.props.navigation.navigate('SignedIn')
                        })
                    }
                }).catch((_error) => {
                    console.log("Login Failed!", _error);
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
            this.setState({ usernameError: "Username must be between 4 and 15 characters long" })
            console.log("For kort brukernavn")
        }
    }

    displayCheckMark = () => {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.displayName)
        console.log("entered")
        if (!(this.state.emailError && this.state.passwordError && this.state.usernameError) && (this.state.displayName.length > 4 && this.state.email.length && this.state.password.length > 5)) {
            this.setState({ displayCheckMark: true })
        } else {
            this.setState({ displayCheckMark: false })
        }
    }

    /* backfaceVisibility?: "visible" | "hidden";
        backgroundColor?: string;
        borderBottomColor?: string;
        borderBottomEndRadius?: number;
        borderBottomLeftRadius?: number;
        borderBottomRightRadius?: number;
        borderBottomStartRadius?: number;
        borderBottomWidth?: number;
        borderColor?: string;
        borderEndColor?: string;
        borderLeftColor?: string;
        borderLeftWidth?: number;
        borderRadius?: number;
        borderRightColor?: string;
        borderRightWidth?: number;
        borderStartColor?: string;
        borderStyle?: "solid" | "dotted" | "dashed";
        borderTopColor?: string;
        borderTopEndRadius?: number;
        borderTopLeftRadius?: number;
        borderTopRightRadius?: number;
        borderTopStartRadius?: number;
        borderTopWidth?: number;
        borderWidth?: number;
        opacity?: number;
        testID?: string;
        */


    render() {
        //console.log(this.state)
        //console.log(this.state.password)

        if (this.state.displayCheckMark == true) {
            console.log("Displayit")
        }
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
                        placeholder='USERNAME'
                        placeholderTextColor='grey'

                        //label = 'Må vere mellom 5 og 15'
                        //labelStyle = {{color: 'white'}}
                        onChangeText={displayName => this.setState({
                            displayName: displayName
                        }, () => {
                            this.displayCheckMark();
                        })}
                        value={this.state.displayName}
                        errorMessage={this.state.usernameError}
                        errorStyle={{ color: 'orange' }}
                        //containerStyle={{ backgroundColor: 'white', borderRadius: 40 }}
                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: 40 }}

                        leftIcon={
                            <Icon
                                name='user'
                                size={32}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='E-MAIL'
                        placeholderTextColor='grey'
                        //label = 'Email'
                        //labelStyle = {{color: 'white'}}
                        onChangeText={email => this.setState({
                            email: email
                        }, () => {
                            this.displayCheckMark();
                        })}
                        value={this.state.email}
                        errorMessage={this.state.emailError}
                        errorStyle={{ color: 'orange' }}
                        //containerStyle={{ backgroundColor: 'white', borderRadius: 40 }}

                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: 40 }}
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
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

                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: 40 }}
                        //containerStyle={{ backgroundColor: 'white', borderRadius: 40 }}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={32}
                                color='black'
                            />
                        }
                    />

                    <Button
                        buttonStyle={{ marginTop: 28, borderRadius: 40, backgroundColor: 'orange', minWidth: 340, maxWidth: 340 }}

                        /*icon={
                            <Icon
                                name="check"
                                size={30}
                                color="green"
                            />
                        }
                        iconRight*/

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
    fullsize: {
        backgroundColor: '#2D3245',
        //flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        paddingHorizontal: 24

    },
    boxes: {
        //inputContainerStyle= {{backgroundColor: 'white'}}
    }
})
