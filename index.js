
/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundFetch from "react-native-background-fetch";
import firebase from 'firebase/app';




let fetchData = async () => {
    const { currentUser } = await firebase.auth()
    console.log("This is the current user", currentUser)

    navigator.geolocation.getCurrentPosition(position => {




        isInside = (radius = 9999999999) => {
            const R = 6371000;
            if (!position) {
                //console.log("No position!")
                return false;
            }
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            console.log("This is the latitude: ", lat)
            console.log("This is the longitude: ", lng)

            //const lat = 60.382186;
            //const lng = 5.332215;
            const lesesalenLat = 60.4595623;
            const lesesalenLng = 5.3279822;
            const radians = Math.PI / 180.0;
            const rlesesalenLat = lesesalenLat * radians;
            const rlat = lat * radians;
            const triLat = Math.abs(lat - lesesalenLat) * radians;
            const triLong = Math.abs(lesesalenLng - lng) * radians;

            const a = (Math.sin(triLat / 2) * Math.sin(triLat / 2)) + (Math.cos(lesesalenLat * radians) * Math.cos(lat * radians) * Math.sin(triLong / 2.0) * Math.sin(triLong / 2.0));
            //console.log(a)

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            //console.log(c)
            const answer = R * c
            //console.log(answer)
            if (answer > radius) {
                return false;
            }
            console.log("Returned true")
            return true;
        }

        let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        let year = new Date().getFullYear(); //Current Year
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes(); //Current Minutes

        console.log(month)

        let time = {
            date: date,
            month: month,
            year: year,
            hours: hours,
            min: min,
        }

        const hourList = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo', 'twentythree']

        console.log(time)


        if (currentUser) {
            console.log('THERE IS A USER!')
            const recentPost = firebase.database().ref(`allTime/${currentUser.uid}`);
            if (isInside()) {
                recentPost.once('value').then(snapshot => {
                    console.log(snapshot.val())
                    console.log(time)
                    if (snapshot.val().isOnLesesalen) {
                        let timeDifference = ((time.hours - snapshot.val().time.hours) * 60 + (time.min - snapshot.val().time.min));
                        if (timeDifference > 60) {
                            timeDifference = 60;
                        }
                        if (time.hours < snapshot.val().time.hours) {
                            timeDifference = ((time.hours + 24 - snapshot.val().time.hours) * 60 + (time.min - snapshot.val().time.min))
                        }
                        console.log("This is the difference in time", timeDifference)
                        firebase.database().ref(`allTime/${currentUser.uid}`).update({
                            hours: snapshot.val().hours + timeDifference,
                            haveBeenToSchool: true,
                            isOnLesesalen: true,
                            time: time,

                        })
                        console.log("Hours: ", time.hours)
                        console.log("Hourlist: ", hourList[time.hours])
                        let hourPos = parseInt(time.hours)
                        firebase.database().ref(`allTime/${currentUser.uid}/hourOfTheDay/${hourList[hourPos]}`).set({
                            thisHour: true
                        })

                    }
                    else {
                        firebase.database().ref(`allTime/${currentUser.uid}`).update({
                            haveBeenToSchool: true,
                            isOnLesesalen: true,
                            time: time
                        })
                    }

                    //this.setState({ hours: snapshot.val() + 100 })
                })
            }
            else {
                recentPost.once('value').then(snapshot => {
                    firebase.database().ref(`allTime/${currentUser.uid}`).update({
                        isOnLesesalen: false,
                        time: time
                    })
                    //this.setState({ hours: snapshot.val() + 100 })
                })
            }
        }
        else {
            console.log('THERE IS NOT A USER!!!!!')
        }
    }, err => console.log(err));
}


let MyHeadlessTask = async () => {
    console.log('[BackgroundFetch HeadlessTask] start');

    firebase.auth().onAuthStateChanged(user => {
        console.log("Changed auth state")
        //console.log(user)
        if (user) {
            console.log("Changed auth state to logged in")
            fetchData()

        }
        else {
            console.log("Changed auth state to not logged in")

        }
    });



    const { currentUser } = await firebase.auth()
    if (currentUser) {
        fetchData()
    }
    /*console.log("This is the current user", currentUser)

      navigator.geolocation.getCurrentPosition(position => {




        isInside = (radius = 9999999999) => {
          const R = 6371000;
          if (!position) {
            //console.log("No position!")
            return false;
          }
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          console.log("This is the latitude: ", lat)
          console.log("This is the longitude: ", lng)

          //const lat = 60.382186;
          //const lng = 5.332215;
          const lesesalenLat = 60.4595623;
          const lesesalenLng = 5.3279822;
          const radians = Math.PI / 180.0;
          const rlesesalenLat = lesesalenLat * radians;
          const rlat = lat * radians;
          const triLat = Math.abs(lat - lesesalenLat) * radians;
          const triLong = Math.abs(lesesalenLng - lng) * radians;

          const a = (Math.sin(triLat / 2) * Math.sin(triLat / 2)) + (Math.cos(lesesalenLat * radians) * Math.cos(lat * radians) * Math.sin(triLong / 2.0) * Math.sin(triLong / 2.0));
          //console.log(a)

          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          //console.log(c)
          const answer = R * c
          //console.log(answer)
          if (answer > radius) {
            return false;
          }
          console.log("Returned true")
          return true;
        }

        let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        let year = new Date().getFullYear(); //Current Year
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes(); //Current Minutes

        console.log(month)

        let time = {
          date: date,
          month: month,
          year: year,
          hours: hours,
          min: min,
        }

        console.log(time)


        if (currentUser) {
          console.log('THERE IS A USER!')
          const recentPost = firebase.database().ref(`allTime/${currentUser.uid}`);
          if (isInside()) {
            recentPost.once('value').then(snapshot => {
              console.log(snapshot.val())
              console.log(time)
              if (snapshot.val().isOnLesesalen) {
                console.log("This is the difference in time", ((time.hours - snapshot.val().time.hours) * 60 + (time.min - snapshot.val().time.min)))
                firebase.database().ref(`allTime/${currentUser.uid}`).update({
                  hours: snapshot.val().hours + ((time.hours - snapshot.val().time.hours) * 60 + (time.min - snapshot.val().time.min)),
                  haveBeenToSchool: true,
                  isOnLesesalen: true,
                  time: time
                })
              }
              else {
                firebase.database().ref(`allTime/${currentUser.uid}`).update({
                  haveBeenToSchool: true,
                  isOnLesesalen: true,
                  time: time
                })
              }

              //this.setState({ hours: snapshot.val() + 100 })
            })
          }
          else {
            recentPost.once('value').then(snapshot => {
              firebase.database().ref(`allTime/${currentUser.uid}`).update({
                isOnLesesalen: false,
                time: time
              })
              //this.setState({ hours: snapshot.val() + 100 })
            })
          }
        }
        else {
          console.log('THERE IS NOT A USER!!!!!')
        }
      }, err => console.log(err)); */

    /*
         var date = new Date().getDate();
         var month = new Date().getMonth() + 1;
         var year = new Date().getFullYear();
         var currentTime = `${year}-${month}-${date}T00:00:00Z`;
         const API_KEY = 'AIzaSyDX56itpFfR3zfjfJK0nUesbFLBo4pYfVc';
         let url = `https://www.googleapis.com/calendar/v3/calendars/t3rc186t378bvsv4mjpie6l1ic@group.calendar.google.com/events?key=${API_KEY}&timeMin=${currentTime}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${this.state.pageToken}`;
         let response = await fetch(url)
         let resoponseJson = await response.json()
         console.log("Response: ", resoponseJson)
    */


    // Perform an example HTTP request.
    // Important:  await asychronous tasks when using HeadlessJS.

    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish();
}

// Register your BackgroundFetch HeadlessTask
AppRegistry.registerComponent(appName, () => App);

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

