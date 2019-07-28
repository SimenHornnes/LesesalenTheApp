import React from 'react'
import { View, Text, StyleSheet, Dimensions, Keyboard, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';


export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            currentPasswordError: undefined,
            newPasswordError: undefined,
            confirmPasswordError: undefined,
            visible: false,
        }
    }

    reauthenticate = (currentPassword) => {
        let user = firebase.auth().currentUser
        let cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

    handlePasswordChange = () => {
        if (this.state.newPassword.length > 5) {
            if (this.state.newPassword === this.state.confirmPassword) {
                Keyboard.dismiss()
                this.reauthenticate(this.state.currentPassword).then(() => {
                    let user = firebase.auth().currentUser
                    user.updatePassword(this.state.newPassword).then(() => {
                        this.setState({
                            currentPasswordError: undefined,
                            newPasswordError: undefined,
                            confirmPasswordError: undefined
                        })
                        Alert.alert('Password has been changed')
                    })
                    .catch((error) => {
                        Alert.alert(error.message)
                    })
                })
                .catch((error) => {
                    this.setState({
                        currentPasswordError: 'Current password is invalid'
                    })
                })
            }
            else {
                this.setState({
                    confirmPasswordError: 'Passwords are not equal'
                })
            }
        }
        else {
            this.setState({
                confirmPasswordError: 'Password must be at least 6 characters long'
            })
        }

    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={[styles.inputWrapper]}>
                    <Input
                        marginTop={'10%'}
                        onChangeText={currentPassword => this.setState({
                            currentPassword: currentPassword
                        })}
                        value={this.state.currentPassword}
                        containerStyle={styles.inputStyling}
                        placeholder='Current password'
                        placeholderTextColor='grey'
                        inputStyle={{ color: 'white' }}
                        errorMessage={this.state.currentPasswordError}
                        errorStyle={{ color: 'orange' }}
                        shake={true}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        onChangeText={newPassword => this.setState({
                            newPassword: newPassword
                        })}
                        value={this.state.newPassword}
                        containerStyle={styles.inputStyling}
                        placeholder='New password'
                        placeholderTextColor='grey'
                        inputStyle={{ color: 'white' }}
                        errorMessage={this.state.newPasswordError}
                        errorStyle={{ color: 'orange' }}
                        shake={true}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        onChangeText={confirmPassword => this.setState({
                            confirmPassword: confirmPassword
                        })}
                        value={this.state.confirmPassword}
                        containerStyle={styles.inputStyling}
                        placeholder='Confirm new password'
                        placeholderTextColor='grey'
                        inputStyle={{ color: 'white' }}
                        errorMessage={this.state.confirmPasswordError}
                        errorStyle={{ color: 'orange' }}
                        shake={true}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <Button
                        buttonStyle={{ marginTop: 28, marginBottom: 10, alignSelf: "center", borderRadius: 6, backgroundColor: 'orange', width: '95%' }}
                        title="CHANGE PASSWORD"
                        titleStyle={{ fontSize: 15, }}
                        onPress={this.handlePasswordChange}
                    />
                </View>
            </View>)
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#373d54',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    textStyle: {
        fontSize: 14,
        alignItems: 'center',
        color: 'white',
        paddingLeft: '3%'
    },
    inputWrapper: {
        paddingBottom: '5%',
        backgroundColor: '#2D3245',
        justifyContent: 'center',
        elevation: 4,
    },
    popUp: {

    },
})