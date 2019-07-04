import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView, RefreshControl } from "react-native";
import firebase from 'firebase/app';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import CustomTable from './CustomTable'
import fetchData from './BackgroundFetch'



export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highScoreList: [],
      tableHead: ['Rank', 'User', 'Hours', 'Streak'],
      widthArr: [Dimensions.get('window').width / 6, Dimensions.get('window').width / 2, Dimensions.get('window').width / 6, Dimensions.get('window').width / 6],
      username: undefined,
      refreshing: false,
      //isDataLoaded: false
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });

  }



  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ username: currentUser.displayName })
  }


  componentDidMount() {
    this.fetchData().done()

    //For å displaye currentuser i tabellen
    const { currentUser } = firebase.auth()
    this.setState({ username: currentUser.displayName })

  }

  async fetchData() {
    fetchData()
    const { currentUser } = firebase.auth()
    await this.setState({
      highScoreList: [],
      username: currentUser.displayName
    })
    const ref = firebase.database().ref(this.props.path)
    ref.orderByChild('hours').on('child_changed', async (snapshot) => {
      let lista = ({
        id: await (snapshot.key),
        hours: await (snapshot.val().hours),
        name: await (snapshot.val().name),
        streak: await (snapshot.val().streak)
      });

      const newList = this.state.highScoreList.map(el => el.id === lista.id ? lista : el).sort((a, b) => a.hours - b.hours)

      this.setState({ highScoreList: newList })
    })

    ref.orderByChild('hours').on('child_added', async (snapshot) => {
      const lista = this.state.highScoreList

      lista.push({
        id: await (snapshot.key),
        hours: await (snapshot.val().hours),
        name: await (snapshot.val().name),
        streak: await (snapshot.val().streak)
      });

      this.setState({ highScoreList: lista })
    });


  }



  render() {


    if (this.state.highScoreList.length) {

      return (
        <View style={styles.container}>

          <ScrollView style={styles.dataWrapper} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              progressBackgroundColor="orange"
              colors={['white']}
            />
          }>
            <CustomTable navigation={this.props.navigation} list={this.state.highScoreList} name={this.state.username}></CustomTable>
          </ScrollView>
        </View>
      )
    } else {
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
