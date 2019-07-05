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

    renderSeparator = () => {
        return (
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#7FC3F5',
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };
    //handling onPress action  
    getListViewItem = (item) => {
        Alert.alert(item.description);
    }

    render() {
        //console.log(this.props.data)

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}

                    renderItem={({ item }) =>
                        <Text style={styles.item}
                            onPress={this.getListViewItem.bind(this, item)}>
                            {item.start.date ? (item.summary + " " + item.start.date.substring(8, 10) + "." + item.start.date.substring(5, 7) + "." + item.start.date.substring(0, 4)) : (item.summary + " " + item.start.dateTime.substring(8, 10) + "." + item.start.dateTime.substring(5, 7) + "." + item.start.dateTime.substring(0, 4))}
                        </Text>}
                        
                    ItemSeparatorComponent={this.renderSeparator}
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
        //paddingTop: 13,
        paddingLeft: 15,
        fontSize: 16,
        textAlignVertical: 'center',
        height: 75,
        color: 'white',

    },
})
