import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView } from "react-native";
import firebase from 'firebase/app';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import CustomTable from './CustomTable'




export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highScoreList: [],
      tableHead: ['Rank', 'User', 'Hours', 'Streak'],
      widthArr: [Dimensions.get('window').width / 6, Dimensions.get('window').width / 2, Dimensions.get('window').width / 6, Dimensions.get('window').width / 6],
      username: undefined
      //isDataLoaded: false
    }
  }




  componentDidMount() {
    this.fetchData().done()

    //For å displaye currentuser i tabellen
    const { currentUser } = firebase.auth()
    //console.log(currentUser)
    this.setState({ username: currentUser.displayName })

  }

  async fetchData() {
    const ref = firebase.database().ref(this.props.path)

    ref.orderByChild('hours').on('child_added', async (snapshot) => {
      //console.log(snapshot.key + " " + snapshot.val().hours)
      const lista = this.state.highScoreList

      lista.push({
        id: await (snapshot.key),
        hours: await (snapshot.val().hours),
        name: await (snapshot.val().name)
      });

      this.setState({ highScoreList: lista })
      //console.log(this.state.highScoreList)
    });
  }

  /*
<ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: 'white'}}>
                {
                  this.state.highScoreList.slice(0).reverse().map((rowData, index) => (
                    <Row
                      key={index}
                      data={[index + 1, rowData.name, rowData.hours, 0]}
                      widthArr={this.state.widthArr}
                      style={[styles.row, index % 2 && { backgroundColor: 'white' }, index / 1 == 0 && { backgroundColor: 'gold' }, index / 1 == 1 && { backgroundColor: 'silver' }, , index / 1 == 2 && { backgroundColor: '#cd7f32' }, rowData.name == this.state.username && !(index/1== 2 || index/1==1||index/1==0) && {backgroundColor:'red'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
  */


  render() {
    //console.log(this.state)
    //console.log("length" + this.state.highScoreList)
    //if(this.state.highScoreList){
    //const temp =Object.values(this.state)
    //console.log(temp)
    //console.log(((Object.values(this.state))[0]).length)
    if (this.state.highScoreList.length) {
      console.log("we made IT")

      console.log(this.state.highScoreList)
      return (
        <View style={styles.container}>
          {/*<Table borderStyle={{ borderColor: 'black' }}>
            <Row data={this.state.tableHead}
              widthArr={this.state.widthArr}
              style={styles.header}
              textStyle={styles.headerText} />
      </Table> */}
          <ScrollView style={styles.dataWrapper}>
            <CustomTable list={this.state.highScoreList} name={this.state.username}></CustomTable>
          </ScrollView>
        </View>
      )
    } else {
      console.log("State var tom")
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D3245' }}>
        <Text style={{ color: 'white' }}> Waiting for data...</Text>
      </View>)
    }
  }

}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#2D3245' },
  header: { height: 35, backgroundColor: '#2D3245' },
  headerText: { textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 },
  text: { textAlign: 'center', fontWeight: '200', fontSize: 18, color: "black", },
  dataWrapper: { marginTop: -1 },
  row: { height: 30, backgroundColor: 'white' }
});
