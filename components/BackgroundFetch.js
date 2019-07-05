import BackgroundFetch from "react-native-background-fetch";
import firebase from 'firebase/app';


export default fetchData = async () => {
    const { currentUser } = await firebase.auth()

    navigator.geolocation.getCurrentPosition(position => {
        isInside = (radius = 9999999999) => {
            const R = 6371000;
            if (!position) {
                return false;
            }
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const lesesalenLat = 60.4595623;
            const lesesalenLng = 5.3279822;
            const radians = Math.PI / 180.0;
            const rlesesalenLat = lesesalenLat * radians;
            const rlat = lat * radians;
            const triLat = Math.abs(lat - lesesalenLat) * radians;
            const triLong = Math.abs(lesesalenLng - lng) * radians;

            const a = (Math.sin(triLat / 2) * Math.sin(triLat / 2)) + (Math.cos(lesesalenLat * radians) * Math.cos(lat * radians) * Math.sin(triLong / 2.0) * Math.sin(triLong / 2.0));
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const answer = R * c

            return answer <= radius;
        }

        let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        let year = new Date().getFullYear(); //Current Year
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes(); //Current Minutes


        let time = {
            date: date,
            month: month,
            year: year,
            hours: hours,
            min: min,
        }

        const hourList = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo', 'twentythree']

        if (currentUser) {
            const recentPost = firebase.database().ref(`users/${currentUser.uid}`);
            if (isInside()) {
                recentPost.once('value').then(snapshot => {
                    if (snapshot.val().isOnLesesalen) {
                        let timeDifference = ((time.hours - snapshot.val().time.hours) * 60 + (time.min - snapshot.val().time.min));
                        if (timeDifference > 60) {
                            timeDifference = 60;
                        }
                        if (time.hours < snapshot.val().time.hours) {
                            timeDifference = ((time.hours + 24 - snapshot.val().time.hours) * 60 + (time.min - snapshot.val().time.min))
                        }
                        firebase.database().ref(`users/${currentUser.uid}`).update({
                            hoursAllTime: snapshot.val().hoursAllTime + timeDifference,
                            hoursSemester: snapshot.val().hoursSemester + timeDifference,
                            hoursWeekly: snapshot.val().hoursWeekly + timeDifference,
                            haveBeenToSchool: true,
                            isOnLesesalen: true,
                            time: time,

                        })
                        let hourPos = parseInt(time.hours)
                        firebase.database().ref(`users/${currentUser.uid}/hourOfTheDay/${hourList[hourPos]}`).set({
                            thisHour: true
                        })

                    }
                    else {
                        firebase.database().ref(`users/${currentUser.uid}`).update({
                            haveBeenToSchool: true,
                            isOnLesesalen: true,
                            time: time
                        })
                    }
                })
            }
            else {
                recentPost.once('value').then(snapshot => {
                    firebase.database().ref(`users/${currentUser.uid}`).update({
                        isOnLesesalen: false,
                        time: time
                    })
                })
            }
        }
    }, err => console.error(err));
}