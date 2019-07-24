import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailScreen from './DetailScreen'
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase/app';
import {colorObject} from './ColorConfig'






//-fire

export default class AchievementsCustomTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            sortpath: undefined
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        const { navigation } = this.props;
    const sortpath = navigation.getParam('sortpath', 'NO-ID');
        this.setState({ userId: currentUser.uid, sortpath: sortpath })
        

    }


    renderRow(e1, e2, e3, e4, userId) {
        return (
            <TouchableHighlight key={userId} onPress={() => { this.props.navigation.navigate("DetailScreen", { userId, e2 }) }}
                underlayColor="white">
                <View style={styles.wrapper}>
                    <View style={styles.double}>
                        <View style={styles.col1}>
                            <Text style={styles.places}>{e1 + 1}. </Text>
                            {e1 == 0 || e1 == 1 || e1 == 2 ? (
                                e1 == 0 ? (
                                    <Icon name='md-trophy' color='gold' size={22.5}></Icon>
                                ) : (
                                        e1 == 1 ? (
                                            <Icon name='md-trophy' color='silver' size={20}></Icon>
                                        ) : (
                                                <Icon name='md-trophy' color='#cd7f32' size={17.5}></Icon>
                                            )
                                    )
                            ) : (
                                    null
                                )}
                        </View>
                        <View style={styles.col2}>
                            <Text style={[styles.text, userId == this.state.userId && { fontWeight: 'bold', color: '#7FC3F5' }]}>{e2}</Text>
                        </View>
                    </View>
                    <View style={styles.col3}>
                        <Text style={styles.textHours}>{e3}</Text>
                    </View>
                    <View style={styles.col4}>
                        <Text style={styles.text1}>  {e4} {this.state.sortpath} </Text>
                    </View>
                </View>
            </TouchableHighlight>

        );
    }


    render() {
        return (
            <View>
                {
                    this.props.list.slice(0).reverse().map((rowData, index) =>  // This will render a row for each data element.
                        this.renderRow(index, rowData.name, rowData.numwon, '', rowData.id)
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        display: 'flex',
        borderBottomColor: '#373d54',
        borderBottomWidth: 1,
        backgroundColor: colorObject.PrimaryColor,
        height: 70,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        display: 'flex',
        fontSize: 16,
        color: 'black',
        alignItems: 'center',
        color: colorObject.TertiaryColor
    },
    textHours: {
        display: 'flex',
        fontSize: 16,
        color: 'black',
        alignItems: 'center',
        color: colorObject.TertiaryColor,
        textAlign: 'right',
        alignSelf: 'stretch'
    },
    text1: {
        display: 'flex',
        fontSize: 11,
        alignItems: 'center',
        color: colorObject.TertiaryColor,
        textAlign: 'right',
        alignSelf: 'stretch'
    },

    places: {
        display: 'flex',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        color: colorObject.TertiaryColor
    },

    col1: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    col2: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: '3%'
    },
    col3: {
        display: 'flex',
        width: (Dimensions.get('window').width / 100) * 14,
        alignItems: "flex-end",
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    col4: {
        display: 'flex',
        width: (Dimensions.get('window').width / 100) * 11,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    col5: {
        display: 'flex',
        width: (Dimensions.get('window').width / 100) * 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: -5
    },
    double: {
        display: 'flex',
        flexDirection: 'row',
        width: (Dimensions.get('window').width / 100) * 70,
        paddingLeft: '4%',

    }
});

