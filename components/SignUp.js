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
        this.state = { email: '', password: '', displayName: '', errorMessage: null }
    }


    handleSignUp = () => {
        //Limit på lengden av brukernavnet.
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
                    this.setState({ errorMessage: _error.message })
                })

        }
        else {
            this.setState({ errorMessage: "Username must be between 4 and 15 characters long" })
            console.log("For kort brukernavn")
        }
    }


    render() {
        //console.log(this.state)
        //console.log(this.state.password)

        return (
            <View style={styles.fullsize} >
                <View style={{ paddingVertical: 20, padding: 40 }}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            marginBottom: 5
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Sign Up</Text>
                    </View>

                    <Input
                        placeholder='Email'
                        label='Email'
                        labelStyle={{ color: 'white' }}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        //containerStyle={{ backgroundColor: 'green', }}
                        errorMessage='Feilmelding'
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        inputStyle={{ marginBottom: 0 }}
                        placeholder='PASSWORD' secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        inputContainerStyle={{ backgroundColor: 'white', borderColor: 'red', borderTopColor: 'red' }}
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    />
                    <Input
                        inputStyle={{ marginBottom: 0 }}
                        placeholder='DisplayName'
                        onChangeText={displayName => this.setState({ displayName })}
                        value={this.state.displayName}
                        inputContainerStyle={{ backgroundColor: 'white' }}

                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SIGN IN"
                        onPress={this.handleSignUp}
                    />
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        marginBottom: 5
                    }}>
                        <Text style={{ color: 'yellow', fontSize: 15, paddingLeft: 15, paddingRight: 15, textAlign: 'center' }}>{this.state.errorMessage}</Text>
                    </View>

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
    },
    boxes: {
        //inputContainerStyle= {{backgroundColor: 'white'}}
    }
})
