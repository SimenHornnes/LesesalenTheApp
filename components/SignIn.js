import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Dimensions } from 'react-native';
import firebase from 'firebase/app';
import { Header } from 'react-navigation';


//Evt add epost, og confirm password.
export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      emailError: null,
      passwordError: null,
      resetPasswordError: null,
    }
  }

  handleLogin = () => {
    this.setState({
      emailError: null,
      passwordError: null,
    })
    console.log("Pressed sign in button")
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('SignedIn'))
      .catch((_error) => {
        console.log("Login Failed!", _error);
        if (this.state.email.length == 0) {
          this.setState({ emailError: "The email address is empty" })
        } else {
          if (_error.message == "The email address is badly formatted.") {
            this.setState({ emailError: _error.message })
          } else if (_error.message == "The password is invalid or the user does not have a password." || _error.message == "Password should be at least 6 characters" || _error.message == "The password must be 6 characters long or more.") {
            this.setState({ passwordError: "The password is invalid or the user does not exist" })
          }
        }

      })
  }
  handlePasswordReset = () => {
    this.setState({
      emailError: null,
      passwordError: null,
    })
    if (this.state.email) {
      firebase.auth().sendPasswordResetEmail(`${this.state.email}`)
        .then(()=> {
          console.log("Sent password reset mail")
        })
        .catch((err) => {
          console.log(err)
          this.setState({emailError: "There is no user record corresponding to this email."})
        })
    }
    else {
      this.setState({ emailError: "If you want to reset your password, type in your email." })
    }
  }


  render() {

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={styles.fullsize}
        behavior='padding'
      >
        <View>

          <Image source={{ uri: 'https://i.imgur.com/efkEvWV.png' }} style={{ resizeMode: 'contain', marginTop: 25, height: 250, padding: 10 }}
          //https://i.imgur.com/efkEvWV.png logo + tekst height: 250,
          //https://i.imgur.com/7iYvirQ.png berre logoen
          //https://i.imgur.com/JZygUiH.png logo + tekst sidelengds
          />


          <Text style={styles.title}>Join the competition!</Text>

          <Input
            placeholder='E-MAIL'
            placeholderTextColor='grey'
            //label = 'Email'
            //labelStyle = {{color: 'white'}}
            /*onChangeText={email => this.setState({
              email: email
            }, () => {
              this.displayCheckMark();
            })}*/
            onChangeText={email => this.setState({
              email: email
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
            /*onChangeText={password => this.setState({
              password: password
            }, () => {
              this.displayCheckMark();
            })}*/
            onChangeText={password => this.setState({
              password: password
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
            buttonStyle={{ marginTop: 28, marginBottom: 10, alignSelf: "center", borderRadius: 40, backgroundColor: 'orange', minWidth: 340, maxWidth: 340 }}
            /*icon={
                <Icon
                    name="check"
                    size={30}
                    color="green"
                />
            }
            iconRight*/
            title="SIGN IN"
            titleStyle={{ fontSize: 22, }}
            onPress={this.handleLogin}
          />
          <Button
            buttonStyle={{ marginTop: 5, maxWidth: 100, maxHeight: 50, backgroundColor: '#2D3245', alignSelf: 'center' }}
            /*icon={
                <Icon
                    name="check"
                    size={30}
                    color="green"
                />
            }
            iconRight*/
            title="SIGN UP"
            titleStyle={{ fontSize: 17, fontStyle: 'normal' }}
            onPress={() => { this.props.navigation.navigate("SignUp") }}
          />
          <Button
            buttonStyle={{ marginTop: 5, maxWidth: 120, maxHeight: 50, backgroundColor: '#2D3245', alignSelf: 'center', paddingBottom:10 }}
            
            title="Reset Password"
            titleStyle={{ fontSize: 14, fontStyle: 'italic' }}
            onPress={this.handlePasswordReset }
          />
        </View>
      </KeyboardAvoidingView>
    )
  }

}


const styles = StyleSheet.create({
  fullsize: {
    backgroundColor: '#2D3245',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28, fontWeight: 'bold',
    marginTop: 25, marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  }
})
