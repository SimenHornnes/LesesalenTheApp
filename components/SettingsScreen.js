import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import firebase from 'firebase/app';



export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.wrapper}>
            <TouchableHighlight style={styles.compStyle} onPress={() => { this.props.navigation.navigate('ChangeUsername') }} underlayColor="white">
                <View style={styles.insideTouchView}>
                    <Text style={styles.textStyle}>Change Username</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.compStyle} onPress={() => { this.props.navigation.navigate('ChangePassword') }} underlayColor="white">
                <View style={styles.insideTouchView}>
                    <Text style={styles.textStyle}>Change Password</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.compStyle} underlayColor="white">
                <View style={styles.insideTouchView}>
                    <Text style={[styles.textStyle, { color: '#F34A30' }]}>Delete Account</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.logOut}>
                <TouchableHighlight style={styles.logOutBorder} onPress={() => (firebase.auth().signOut())} underlayColor="white">
                    <View style={[styles.insideTouchView, {alignItems: 'center'}]}>
                        <Text style={[styles.textStyle, { paddingLeft: 0 }]}>Log Out</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#2D3245'
    },
    insideTouchView: {
        backgroundColor: '#2D3245',
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    compStyle: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        borderBottomColor: '#373d54',
        borderBottomWidth: 1,

    },
    textStyle: {
        display: 'flex',
        fontSize: 16,
        alignItems: 'center',
        color: 'white',
        paddingLeft: '3%'
    },
    logOut: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    logOutBorder: {
        borderTopColor: '#373d54',
        borderTopWidth: 1,
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})