
/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundFetch from "react-native-background-fetch";
import firebase from 'firebase/app';
 
let MyHeadlessTask = async () => {
    console.log('[BackgroundFetch HeadlessTask] start');
   
 
 
    // Perform an example HTTP request.
    // Important:  await asychronous tasks when using HeadlessJS.
 
    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish();
}
 
// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
 
 
AppRegistry.registerComponent(appName, () => App);