import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';


export default class ChangeUsername extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: undefined,
            nameError: undefined
        }
    }


    handleNameChange = async ()=> {
        console.log('Trying to change username')
        if (this.state.newUsername.length > 4 && this.state.newUsername.length < 16) {
            const { currentUser } = firebase.auth()
            await currentUser.updateProfile({
                displayName: this.state.newUsername
            })
            firebase.database().ref(`users/${currentUser.uid}`).update({
                name: this.state.newUsername
            })
            console.log('Username changed')  
            console.log('New username:', currentUser.displayName)  

        }
        else {
            this.setState({
                nameError: 'Username must be between 4 and 15 characters long'
            })
        }

    }

    render() {
        return (<View style={styles.wrapper}>
            <View style={styles.inputWrapper}>
                <Input
                    onChangeText={newUsername => this.setState({
                        newUsername: newUsername
                    })}
                    value={this.state.newUsername}
                    containerStyle={styles.inputStyling}
                    placeholder='Enter New Username'
                    placeholderTextColor='grey'
                    inputStyle={{ color: 'white' }}
                    errorMessage={this.state.nameError}
                    errorStyle={{ color: 'orange' }}

                />
                <Button
                    buttonStyle={{ marginTop: 28, marginBottom: 10, alignSelf: "center", borderRadius: 6, backgroundColor: 'orange', width: '95%' }}
                    title="CHANGE USERNAME"
                    titleStyle={{ fontSize: 15, }}
                    onPress= {this.handleNameChange}
                />
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#373d54'
    },
    textStyle: {
        fontSize: 16,
        alignItems: 'center',
        color: 'white',
        paddingLeft: '3%'
    },
    inputWrapper: {
        flex: .35,
        backgroundColor: '#2D3245',
        justifyContent: 'center',
        elevation: 4,
    },
})