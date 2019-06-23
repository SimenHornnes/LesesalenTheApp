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
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', errorMessage: null }
  }

  handleLogin = () => {
    console.log("Pressed sign in button")
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('SignedIn'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
    console.log(this.state.errorMessage)
    console.log(this.state.password)


    return (
      <View style={styles.fullsize}>

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

          }}
        >
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
            onChangeText={email => this.setState({
              email: email
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
            onPress={this.handleLogin}
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
})
