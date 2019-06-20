import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import firebase from 'firebase/app';




export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highScoreList: [],
      //isDataLoaded: false
    }
  }


  
  
  componentDidMount() {
<<<<<<< HEAD
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
=======
    this.fetchData().done()
  }

  async fetchData() {
    const ref = firebase.database().ref('users')

    ref.orderByChild('hours').on('child_added', async(snapshot) => {
      //console.log(snapshot.key + " " + snapshot.val().hours)
      const lista = this.state.highScoreList
      
      lista.push({
        id: await(snapshot.key),
        hours: await(snapshot.val().hours),
        name: await(snapshot.val().name)
      }); 
      
      this.setState({highScoreList:lista})
      //console.log(this.state.highScoreList)
    }); 
  }



  render() {
    //console.log(this.state)
    //console.log("length" + this.state.highScoreList)
    //if(this.state.highScoreList){
    //const temp =Object.values(this.state)
    //console.log(temp)
    //console.log(((Object.values(this.state))[0]).length)
    //If statementa må vere riktig for at man ikkje skal reversere lista for tidlig slik at den blir feilsortert
    if (this.state.highScoreList.length) {
      console.log("we made IT")
      console.log(this.state.highScoreList)
      //listReversed = this.state.highScoreList
      //listRev = listReversed.reverse()
      //console.log(listRev)
      
      return (
        <View style={styles.card}>
          {(this.state.highScoreList).map(user => <Text key={user.id} style={{ textAlign: 'center', marginBottom: 10 }}>{user.name}        {user.hours}</Text>)}
        </View>
      )
    } else {
      console.log("State var tom")
      return (<Text> Waiting for data</Text>)
>>>>>>> 667e688b252d75ab35f9eb156cdca953734a46ad
    }
  }

}
//          {this.state.highScoreList.map( user => <Text key = {user.key} style = {{textAlign: 'center', marginBottom: 10}}>{user[key].name}        {user.hours}</Text>)}



const styles = StyleSheet.create({
  card: {
    flex: 1, flexDirection: 'row',
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    minHeight: 333
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    color: "black",
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