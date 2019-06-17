import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, Button} from 'react-native-elements';
import { onSignIn } from '../Auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {Dimensions} from 'react-native';


//Evt add epost, og confirm password.
export default ({ navigation }) => (
  <View style = {styles.fullsize }>
    <View style={{ paddingVertical: 20}}>
       <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 5
        }}
      >
        <Text style={{ color: 'pink', fontSize: 28, fontWeight: 'bold' }}>Sign In</Text>
      </View>
      
      <Card>
        <Input
          placeholder='USERNAME'
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
          
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
        />
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={() => {
            onSignIn().then(() => navigation.navigate("SignedIn"));
          }}
        />
      </Card>
    </View>
    </View>
  );

  const styles = StyleSheet.create({
    fullsize: {
      backgroundColor: '#ADFF2F',
      //flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  })