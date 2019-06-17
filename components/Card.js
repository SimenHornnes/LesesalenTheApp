import React from "react";
import { StyleSheet, View, Text } from "react-native";
import firebase from 'firebase/app';


export default class Card extends React.Component {
  constructor(props) {
    super(props);
    state = {
      highScoreList: []
    }
  }
  

  componentDidMount() {
    const mostHours = firebase.database().ref('users').orderByChild('hours');
    const hList = [];
    for (const key in mostHours) {
      hList.push({
        name: mostHours[key].name,
        hours: mostHours[key].hours,
        id: key
      });
    }
    this.setState({
      highScoreList: hList
    })
    /*fetch(this.props.highList)
    .then(res => res.json())
    .then(parsedRes => {
      const hList = [];
      for (const key in mostHours) {
        hList.push({
          name: mostHours[key].name,
          hours: mostHours[key].hours,
          id: key
        });
      }
      this.setState({
        highScoreList: hList
      })
      console.log("Received data from firebase:");
      console.log(this.state);
    })
    .catch(err => console.log(err));*/
  }

  componentWillUpdate(){
  }


  render(){
    if(this.state){
      return (
        <View style={styles.card}>
          {this.state.highScoreList.map( user => <Text key = {user.id} style = {{textAlign: 'center', marginBottom: 10}}>{user.name}        {user.hours}</Text>)}
        </View>
      )
    }else{
      return (<Text> Waiting for data</Text>)
    }
  }
   
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    minHeight: 333
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    color: "#4A4A4A",
  },
});

/*
export default props => (
  
  <View style={styles.card}>
    <Text style={styles.text}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    minHeight: 333
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    color: "#4A4A4A",
  },
});
*/