import React, { Component } from 'react';  
import { AppRegistry, FlatList,  
    StyleSheet, Text, View,Alert } from 'react-native';  
  
export default class LesesalProgram extends Component { 
    constructor(props){
        super(props)
        state={
            data: null
        }
    } 
  
    renderSeparator = () => {  
        return (  
            <View  
                style={{  
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
                    
                    renderItem={({item}) =>  
                        <Text style={styles.item}  
                              onPress={this.getListViewItem.bind(this, item)}>
                                  {item.start.date ? (item.summary + " " + item.start.date) : (item.summary + " " + item.start.dateTime.substring(0,10))}
                              </Text>}  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
            </View>  
        );  
    }  
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: 'grey'
    },  
    item: {  
        paddingTop: 13,
        paddingLeft: 15,  
        fontSize: 18,  
        height: 44,  
        color:'white',
        
    },  
})  
  