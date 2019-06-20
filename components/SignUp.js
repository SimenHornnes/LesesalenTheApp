import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { onSignIn } from '../Auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Dimensions } from 'react-native';
import firebase from 'firebase/app';



//Evt add epost, og confirm password.
export default class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = { email: '', password: '', displayName: '', errorMessage: null }
    }
    
    
  handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("SignedIn"))
      .catch(error => this.setState({ errorMessage: error.message }))

    
  }


    render() {
        console.log(this.state)
        console.log(this.state.password)
        return (
            <View style={styles.fullsize}>
                <View style={{ paddingVertical: 20 }}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            marginBottom: 5
                        }}
                    >
                        <Text style={{ color: 'black', fontSize: 28, fontWeight: 'bold' }}>Sign Up</Text>
                    </View>

                    <Card>
                        <Input
                            placeholder='Email'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='PASSWORD' secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        />
                        <Input
                            placeholder='DisplayName'
                            onChangeText={displayName => this.setState({ displayName })}
                            value={this.state.displayName}
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
                    </Card>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fullsize: {
        backgroundColor: '#77cde5',
        //flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
