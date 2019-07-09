import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'


export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.wrapper}>
            <TouchableHighlight style={styles.compStyle} onPress={() => {this.props.navigation.navigate('ChangeUsername')}}>
                <View>
                    <Text style={styles.textStyle}>Change Username</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.compStyle}>
                <View>
                    <Text style={styles.textStyle}>Change Password</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.compStyle}>
                <View>
                    <Text style={[styles.textStyle, {color: '#F34A30'}]}>Delete Account</Text>
                </View>
            </TouchableHighlight>
        </View>
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#2D3245'
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
    }
})