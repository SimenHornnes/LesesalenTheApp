import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';




const renderRow = (e1, e2, e3, e4, userId) => {
    return (
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
                <Text style={[styles.text, userId == e2 && { fontWeight: 'bold', color: '#7FC3F5' }]}>{e2}</Text>
            </View>
            <View style={styles.col3}>
                <Text style={styles.text}>{e3}</Text>
            </View>
            <View style={styles.col4}>
                <Text style={styles.text}>{e4}</Text>
            </View>
        </View>
    );
}

export default class CustomTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {
                    this.props.list.slice(0).reverse().map((rowData, index) =>  // This will render a row for each data element.
                        renderRow(index, rowData.name, rowData.hours, rowData.streak, this.props.name)
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
        height: 61.8,
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
    places: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        color: 'white'
    },

    col1: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 17,
        flexDirection: 'row',
        width: '25%',
        alignItems: 'flex-start'
    },
    col2: {
        width: '49%',
        alignItems: 'flex-start'
    },
    col3: {
        width: '16%',
        alignItems: "center"
    },
    col4: {
        width: '16%',
        alignItems: "center"
    }
});
