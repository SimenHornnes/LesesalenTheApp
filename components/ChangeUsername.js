import React from 'react'
import { View, Text, StyleSheet, Dimensions, Keyboard } from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';


export default class ChangeUsername extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: '',
            nameError: undefined,
            visible: false,
        }
    }


    handleNameChange = () => {
        if (this.state.newUsername.length > 4 && this.state.newUsername.length < 16) {
            Keyboard.dismiss()
            this.setState({
                visible: true,
                nameError: undefined
            })
        }
        else {
            this.setState({
                nameError: 'Username must be between 4 and 15 characters long'
            })
        }

    }

    changeName = async () => {
        const { currentUser } = firebase.auth()
        await currentUser.updateProfile({
            displayName: this.state.newUsername
        })
        firebase.database().ref(`users/${currentUser.uid}`).update({
            name: this.state.newUsername
        })
        firebase.database().ref(`achievements/${currentUser.uid}`).update({
            name: this.state.newUsername
        })
        this.setState({ visible: false })
    }

    render() {
        return (
            <View style={styles.wrapper}>
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
                        shake={true}
                    />
                    <Button
                        buttonStyle={{ marginTop: 28, marginBottom: 10, alignSelf: "center", borderRadius: 6, backgroundColor: 'orange', width: '95%' }}
                        title="CHANGE USERNAME"
                        titleStyle={{ fontSize: 15, }}
                        onPress={this.handleNameChange}
                    />
                </View>
                <Dialog
                    width={0.7}
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                textStyle={{ fontSize: 15 }}
                                text="CANCEL"
                                onPress={() => { this.setState({ visible: false }) }}
                            />
                            <DialogButton
                                textStyle={{ fontSize: 15 }}
                                text="YES"
                                onPress={() => { this.changeName() }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent style={{ paddingTop: '7%' }}>
                        <Text>Are you sure you want to change your username?</Text>
                    </DialogContent>
                </Dialog>
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
    popUp: {

    },
})