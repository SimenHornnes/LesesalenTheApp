import React, { Component } from 'react';
import {
    AppRegistry, FlatList,
    StyleSheet, Text, View, Alert, Dimensions
} from 'react-native';

export default class LesesalProgram extends Component {
    constructor(props) {
        super(props)
        state = {
            data: null
        }
    }

    getListViewItem = (item) => {
        Alert.alert(item.description);
    }

    coolDate = (date, day) => {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        return (
            <View style={styles.dateWrapper}>
                <Text style={styles.date}>{parseInt(day)}.</Text>
                <Text style={styles.date}>{months[parseInt(date) - 1]}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View style={styles.wrapper} onPress={this.getListViewItem.bind(this, item)}>
                            {this.coolDate(item.start.date ? item.start.date.substring(5, 7) : item.start.dateTime.substring(5, 7), item.start.date ? item.start.date.substring(8, 10) : item.start.dateTime.substring(8, 10))}
                            <Text style={styles.item}>
                                {item.summary}
                            </Text>
                        </View>}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2D3245',
    },
    item: {
        paddingLeft: '3%',
        fontSize: 16,
        textAlignVertical: 'center',
        height: 75,
        color: 'white',
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#373d54',
    },
    date: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    dateWrapper: {
        borderRightColor: '#373d54',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '20%',
        paddingRight: '2%',
        paddingLeft: '2%',
    }
})
