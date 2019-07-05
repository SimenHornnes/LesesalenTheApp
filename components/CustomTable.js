import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailScreen from './DetailScreen'
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase/app';








//-fire

export default class CustomTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ userId: currentUser.uid })

    }

    renderRow(e1, e2, e3, e4, userId) {
        return (
            <TouchableHighlight onPress={() => { this.props.navigation.navigate("DetailScreen", { userId }) }}
                underlayColor="white">

                <View style={styles.wrapper}>
                    <View style={styles.col1}>
                        <Text style={styles.places}>{e1 + 1}. </Text>
                        {e1 == 0 || e1 == 1 || e1 == 2 ? (
                            e1 == 0 ? (
                                <Icon name='md-trophy' color='gold' size={30}></Icon>
                            ) : (
                                    e1 == 1 ? (
                                        <Icon name='md-trophy' color='silver' size={27.5}></Icon>
                                    ) : (
                                            <Icon name='md-trophy' color='#cd7f32' size={25}></Icon>
                                        )
                                )
                        ) : (
                                null
                            )}
                    </View>
                    <View style={styles.col2}>
                        <Text style={[styles.text, userId == this.state.userId && { fontWeight: 'bold', color: '#7FC3F5' }]}>{e2}</Text>
                    </View>
                <View style={styles.col3}>
                    <Text style={styles.textHours}>{e3}</Text>
                </View>
                <View style={styles.col4}>
                    <Text style={styles.text1}>  {e4}  </Text>

                </View>
                <View style={styles.col5}>
                    {e4 > 15 ? (<View><Icon name='md-flame' color='orange' size={34} ></Icon></View>) :
                        e4 > 10 ? (<View><Icon name='md-flame' color='orange' size={30} ></Icon></View>) :
                            e4 > 6 ? (<View><Icon name='md-flame' color='orange' size={26} ></Icon></View>) :
                                e4 > 4 ? (<View style={{}}><Icon name='md-flame' color='orange' size={22} ></Icon></View>) :
                                    e4 > 3 ? (<View style={{}}><Icon name='md-flame' color='orange' size={18}></Icon></View>) :
                                        e4 > 2 ? (<Icon name='md-flame' color='orange' size={14}></Icon>) : (null)}
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
                        this.renderRow(index, rowData.name, rowData.hours, rowData.streak == null ? ('0') : (rowData.streak), rowData.id)
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        backgroundColor: '#2D3245',
        height: 75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'black',
        alignItems: 'center',
        color: 'white'
    },
    textHours: {
        fontSize: 18,
        color: 'black',
        alignItems: 'center',
        color: 'white',
        textAlign: 'right', alignSelf: 'stretch'
    },
    text1: {
        fontSize: 15,
        color: 'black',
        alignItems: 'center',
        color: 'white',textAlign: 'right', alignSelf: 'stretch'
    },
 
    places: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        color: 'white'
    },
 
    col1: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        width: (Dimensions.get('window').width/100)*20,
        alignItems: 'flex-start'
    },
    col2: {
        width: (Dimensions.get('window').width/100)*54,
        alignItems: 'flex-start',
        paddingLeft: 14
    },
    col3: {
        width: (Dimensions.get('window').width/100)*14,
        alignItems: "center"
    },
    col4: {
        width: (Dimensions.get('window').width/100)*11,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    col5: {
        width: (Dimensions.get('window').width/100)*6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft:-5
    }
});

