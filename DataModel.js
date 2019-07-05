import firebaseConfig from './components/src/Config';
import firebase from 'firebase/app';

export default class DataModel {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.databaseService = firebase.database();
        this.authService =  firebase.auth();
        this.allUsers = []
    }

    fetchUsers(setStateCallback) {
        const ref = this.databaseService.ref('users/');

        /** ON CHILD ADDED **/
        ref.on('child_added', snapshot => {
            const id = snapshot.key;
            const values = snapshot.val();
            const userAdded = { 
                id: id, 
                hoursAllTime: values.hoursAllTime, 
                hoursSemester: values.hoursSemester, 
                hoursWeekly: values.hoursWeekly, 
                name: values.name, 
                streak: values.streak
            };
            
            this.allUsers.push(userAdded);

            setStateCallback({ allUsers: this.allUsers });
          });
        
        /** ON CHILD CHANGED  **/
        ref.on('child_changed',  snapshot => {
            const id = snapshot.key;
            const values = snapshot.val();
            const userChanged = { 
                id: id, 
                hoursAllTime: values.hoursAllTime, 
                hoursSemester: values.hoursSemester, 
                hoursWeekly: values.hoursWeekly, 
                name: values.name, 
                streak: values.streak
            };
      
            this.allUsers.map(user => user.id === userChanged.id ? userChanged : user);
    
            setStateCallback({ allUsers: this.allUsers });
          })  
    }
}