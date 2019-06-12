import React, {useState} from 'react';
import { Button } from 'react-native';

const fetchLocation = (props) => {
    return (
        <Button title={props.title} onPress = {props.onGetLocation} />
    );
};

export default fetchLocation;