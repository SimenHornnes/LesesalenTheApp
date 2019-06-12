import React, {useState} from 'react';
import { Button } from 'react-native';

const showUserLocation = (props) => {
    return (
        <Button title={props.title} onPress = {props.position} />
    );
};

export default showUserLocation;