import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { onSignIn } from '../Auth';
import { Dimensions } from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  //View for heile sida

  render() {

    return (
      <View style={styles2.fullsize}>
        <View style={styles2.card}>

          <Button
            buttonStyle={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
            //backgroundColor="#03A9F4"

            title="SIGN UP"
            //Denne linja bestemmer action knappen "sign up"
            onPress={() => {
              onSignIn().then(() => this.props.navigation.navigate("SignUp"));
            }}
          />
          <Button
            buttonStyle={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
            //backgroundColor="transparent"
            textStyle={{ color: "#027F93" }}
            title="Sign In"
            onPress={() => this.props.navigation.navigate("SignIn")}
          />
        </View>
      </View>
    )
  }
}

const styles2 = StyleSheet.create({
  fullsize: {
    backgroundColor: '#FDD979',
    //flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  card: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#0C9DAE',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    minHeight: 33
  },
})

