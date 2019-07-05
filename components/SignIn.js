import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Dimensions } from 'react-native';
import firebase from 'firebase/app';
import { Header } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';


export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      emailError: null,
      passwordError: null,
      resetPasswordError: null,
      resetPasswordEmailSent: true,
      emailVerified: false,
      success: false
    }
  }

  handleLogin = () => {
    this.setState({
      emailError: null,
      passwordError: null,
    })
    const { email, password } = this.state

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((_error) => {
        if (this.state.email.length == 0) {
          this.setState({ emailError: "The email address is empty" })
        } else {
          if (_error.message == "The email address is badly formatted.") {
            this.setState({ emailError: _error.message })
          } else if (_error.message == "The password is invalid or the user does not have a password." || _error.message == "Password should be at least 6 characters" || _error.message == "The password must be 6 characters long or more." || _error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
            this.setState({ passwordError: "The password is invalid or the user does not exist" })
          }
        }
      })
  }
  warn() {
    const curr = firebase.auth().currentUser
    if ((curr.emailVerified == false) && curr.email && !this.state.emailError && !this.state.passwordError) {
      this.dropDownAlertRef.alertWithType('warn', 'Warn', 'You need to verify your email (and reload the app)');
    }

  }


  handlePasswordReset = () => {
    this.setState({
      emailError: null,
      passwordError: null,
    })
    if (this.state.email) {
      firebase.auth().sendPasswordResetEmail(`${this.state.email}`)
        .then(() => {
          this.dropDownAlertRef.alertWithType('success', 'Success', 'Email sent');
          this.setState({ resetPasswordEmailSent: true })

        })
        .catch((err) => {
          this.setState({ emailError: "There is no user record corresponding to this email." })
        })
    }
    else {
      this.setState({ emailError: "If you want to reset your password, type in your email." })
    }
  }


  render() {
    const borderradi = 15
    return (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + 20}
          style={styles.fullsize}
          behavior='padding'
        >
          <DropdownAlert
            ref={ref => this.dropDownAlertRef = ref}
            successColor='orange' />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Image source={{ uri: 'https://i.imgur.com/efkEvWV.png' }} style={{ resizeMode: 'contain', marginTop: 25, height: 250, padding: 10 }}
            />


            <Text style={styles.title}>Join the competition!</Text>

            <Input
              containerStyle={styles.inputStyling}
              placeholder='E-MAIL'
              placeholderTextColor='grey'
              keyboardType='email-address'
              autoCapitalize='none'
              importantForAutofill='no'              
              onChangeText={email => this.setState({
                email: email
              })}
              value={this.state.email}
              errorMessage={this.state.emailError}
              errorStyle={{ color: 'orange' }}

              inputContainerStyle={{ backgroundColor: 'white', borderRadius: borderradi }}
              leftIcon={
                <Icon
                  name='envelope'
                  size={18}
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
              })}
              value={this.state.password}
              errorMessage={this.state.passwordError}
              errorStyle={{ color: 'orange' }}
              shake={true}

              inputContainerStyle={{ backgroundColor: 'white', borderRadius: borderradi }}
              leftIcon={
                <Icon
                  name='lock'
                  size={22}
                  color='black'
                />
              }
            />

            <Button
              buttonStyle={{ marginTop: 28, marginBottom: 10, alignSelf: "center", borderRadius: borderradi, backgroundColor: 'orange', width: ((Dimensions.get('window').width)/100)*85  }}
              title="SIGN IN"
              titleStyle={{ fontSize: 22, }}
              onPress={this.handleLogin}
            />
            <Button
              buttonStyle={{ marginTop: 5, maxWidth: 100, maxHeight: 50, backgroundColor: '#2D3245', alignSelf: 'center' }}
              title="SIGN UP"
              titleStyle={{ fontSize: 17, fontStyle: 'normal' }}
              onPress={() => { this.props.navigation.navigate("SignUp") }}
            />
            <Button
              buttonStyle={{ marginTop: 5, maxWidth: 120, maxHeight: 50, backgroundColor: '#2D3245', alignSelf: 'center', marginBottom: 15 }}

              title="Reset Password"
              titleStyle={{ fontSize: 14, fontStyle: 'italic' }}
              onPress={this.handlePasswordReset}
            />


          </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
  }

}


const styles = StyleSheet.create({
  inputStyling: {
    paddingBottom:6,
    width: ((Dimensions.get('window').width)/100)*90
},
  fullsize: {
    backgroundColor: '#2D3245',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: "center",
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
