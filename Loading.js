import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase/app'
import { colors } from 'react-native-elements';

export default class Loading extends React.Component {
    
  render() {
    return (
      <View style={styles.container}>
        <View style= {styles.box1}><ActivityIndicator size="large" /></View>
        <View style= {styles.box2}><Text style={styles.textStyle}>Loading..</Text></View>
        <View style= {styles.box3}><Text style={styles.textStyle2}>Did you know Torjus and Simen developed this app on their own?</Text></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 24
  },
  textStyle2: {
    color: 'white',
    fontSize: 10,
    fontStyle:'italic',
    paddingTop: 40
  },
  box1:{
    
  },
  box2: {
    paddingTop: 30
  },
  box3: {

  }
})