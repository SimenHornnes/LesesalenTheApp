import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView } from "react-native";


const DidYouKnow = (props) => {
    const rand = Math.floor(Math.random() * 7);
    const didYouKnow = ["Did you know?", "Did you know that 2", "Did you know 3", "Did you know that cashews come from a fruit",
        "Did you know that 5", "Did you know 6", "Did you know 7", "Did you know 8"]
    console.log(didYouKnow[rand])
    return (
        <Text {...didYouKnow[rand]} />
    );
};
export default DidYouKnow;

/*
export default class DidYouKnow extends React.Component {
    getFact() {
        const rand = Math.floor(Math.random() * 7);
        const didYouKnow = ["Did you know?", "Did you know that 2", "Did you know 3", "Did you know that cashews come from a fruit",
            "Did you know that 5", "Did you know 6", "Did you know 7", "Did you know 8"]
        console.log(didYouKnow[rand])
    }

    render(){
        return(
            <View><Text>{this.getFact()}</Text></View>

        )
    }
}

*/
