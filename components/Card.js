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
    const hList = []
    const ref = firebase.database().ref('users')
    ref.orderByChild('hours').on('child_added', snapshot => {
      console.log(snapshot.key)
      hList.push({
        name: snapshot.val().name,
        hours: snapshot.val().hours,
        id: snapshot.key
      });
      return hList;
    });
    console.log(hList)
    this.setState({highScoreList: hList})
  
   /* fetch(`${this.props.highList}`)
    .then(res => res.json())
    .then(parsedRes => {
      const hList = [];
      for (const key in parsedRes) {
        hList.push({
          name: parsedRes[key].name,
          hours: parsedRes[key].hours,
          id: key
        });
      }
      this.setState({
        highScoreList: hList
      })
      //console.log("Received data from firebase:");
      //console.log(this.state);
    })
    .catch(err => console.log(err));*/
  }

  render(){
    if(this.state){
    console.log(this.state.highScoreList)

      return (
        <View style={styles.card}>
          {this.state.highScoreList.map( user => <Text key = {user.id} style = {{textAlign: 'center', color: 'black'}}>{user}funsefine{user}</Text>)}
        </View>
      )
    }else{
      return (<Text> Waiting for data...</Text>)
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