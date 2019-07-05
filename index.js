import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundFetch from "react-native-background-fetch";
import firebase from 'firebase/app';
import fetchData from './components/BackgroundFetch'

let MyHeadlessTask = async () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            fetchData();
        }
    });

    const { currentUser } = await firebase.auth()
    if (currentUser) {
        fetchData()
    }
    
    BackgroundFetch.finish();
}

// Register your BackgroundFetch HeadlessTask
AppRegistry.registerComponent(appName, () => App);

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

