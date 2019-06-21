import { AsyncStorage } from 'react-native';
import firebase from 'firebase/app';
//import { Firebase } from './components/src/Config';


export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);



//FLYTTA OVER TIL MAIN
/*export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    console.log("Checking if signed in")
    //Mulig
    
    /*AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));

    //Det er en feil her når vi loada appen, den blir berre aktivert viss man dobbelttrykke eller staten blir endra
    firebase.auth().onAuthStateChanged(user => {
      console.log("Changed auth state")
      console.log(user)
      if (user) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    });

  });
};*/
