import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView, RefreshControl } from "react-native";
import firebase from 'firebase/app';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import CustomTable from './CustomTable'
import AchievementsCustomTable from './AchievementsCustomTable'
import fetchData from './BackgroundFetch'



export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highScoreList: [],
      username: undefined,
      refreshing: false,
      sortpath: 'NO-ID',
      sortpathloaded: false,
      section: 'NO-ID',
      sectionloaded: false,
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchData().then(() => this.setState({ refreshing: false }))
  }



  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ username: currentUser.displayName })
  }


  componentDidMount() {
    this.fetchData()
    const { currentUser } = firebase.auth()
    this.setState({ username: currentUser.displayName })
  }

  componentWillReceiveProps() {
    const { navigation } = this.props;
    const sortpath = navigation.getParam('sortpath', 'NO-ID');
    const section = navigation.getParam('section', 'NO-ID');
    this.setState({ sortpath: sortpath, section: section })
  }

  //componentdidupdate pga propsa ikkje er med i første render
  componentDidUpdate() {
    const { navigation } = this.props;
    const sortpath = navigation.getParam('sortpath', 'NO-ID')
    const section = navigation.getParam('section', 'NO-ID')

    if (sortpath !== this.state.sortpath || section !== this.state.section) {
      this.setState({ sortpath: navigation.getParam('sortpath', 'NO-ID'), sortpathloaded: true, section: navigation.getParam('section', 'NO-ID'), sectionloaded: true, highScoreList: [] })
    }



    if (this.state.sortpathloaded === true && this.state.sectionloaded) {
      this.fetchData()
    }
  }



  fetchData() {
    const { currentUser } = firebase.auth()
    this.setState({
      username: currentUser.displayName,
      sortpathloaded: false,
      sectionloaded: false
    })

    //ORGINALEN
    if (this.state.sortpath === 'NO-ID' && this.state.section === 'NO-ID') {
      const ref = firebase.database().ref("users/")

      ref.orderByChild(this.props.path).on('child_changed', (snapshot) => {
        let lista = ({
          id: (snapshot.key),
          hours: (snapshot.val()[this.props.path]),
          name: (snapshot.val().name),
          streak: (snapshot.val().streak)
        });

        const newList = this.state.highScoreList.map(el => el.id === lista.id ? lista : el).sort((a, b) => a.hours - b.hours)
        if (this.state.sortpath === 'NO-ID' && this.state.section === 'NO-ID') {
          console.log('ups2')

          this.setState({ highScoreList: newList })
        }
      })

      ref.orderByChild(this.props.path).on('child_added', (snapshot) => {
        const lista = this.state.highScoreList

        lista.push({
          id: (snapshot.key),
          hours: (snapshot.val()[this.props.path]),
          name: (snapshot.val().name),
          streak: (snapshot.val().streak)
        });
        if (this.state.sortpath === 'NO-ID' && this.state.section === 'NO-ID') {
          this.setState({ highScoreList: lista.sort((a, b) => a.hours - b.hours) })
        }
      });
    }



    //SORTER ACHIEVEMENTS
    else if ((this.state.section === 'achievements/' && this.state.sortpath.startsWith('before8')) || (this.state.section === 'users/' && this.state.sortpath.startsWith('streak'))) {
      const ref = firebase.database().ref(this.state.section)
      ref.orderByChild(this.state.sortpath).on('child_changed', (snapshot) => {
        console.log(snapshot)
        let lista = ({
          id: (snapshot.key),
          numwon: (snapshot.val()[this.state.sortpath]),
          name: (snapshot.val().name),
        });
        console.log(snapshot.index_.indexPath_.pieces_)

        const newList = this.state.highScoreList.map(el => el.id === lista.id ? lista : el).sort((a, b) => a.numwon - b.numwon)
        if (snapshot.index_.indexPath_.pieces_[0] === this.state.sortpath) {
          if ((this.state.section === 'users/' && this.state.sortpath.startsWith('streak')) || (this.state.section === 'achievements/' && this.state.sortpath.startsWith('before8'))) {
            console.log('ups2')
            console.log(this.state.section)
            console.log(this.state.sortpath)
            this.setState({ highScoreList: newList })
          }
        }
      })


      ref.orderByChild(this.state.sortpath).on('child_added', (snapshot) => {

        const lista = this.state.highScoreList

        lista.push({
          id: (snapshot.key),
          numwon: (snapshot.val()[this.state.sortpath]),
          name: (snapshot.val().name),
        });
        if ((this.state.section === 'users/' && this.state.sortpath.startsWith('streak')) || (this.state.section === 'achievements/' && this.state.sortpath.startsWith('before8'))) {
          console.log('ups2')

          this.setState({ highScoreList: lista.sort((a, b) => a.numwon - b.numwon) })
        }
      });
    }

    //SORTER RESTEN
    else if (this.state.sortpath !== 'NO-ID' && this.state.section !== 'NO-ID') {
      const ref = firebase.database().ref(this.state.section)
      ref.orderByChild(this.state.sortpath).on('child_changed', (snapshot) => {

        let lista = ({
          id: (snapshot.key),
          hours: (snapshot.val()[this.state.sortpath]),
          name: (snapshot.val().name),
          streak: (snapshot.val().streak)
        });

        const newList = this.state.highScoreList.map(el => el.id === lista.id ? lista : el).sort((a, b) => a.hours - b.hours)
        if (this.state.section !== 'achievements/') {
          this.setState({ highScoreList: newList })
        }
      })


      ref.orderByChild(this.state.sortpath).on('child_added', (snapshot) => {

        const lista = this.state.highScoreList

        lista.push({
          id: (snapshot.key),
          hours: (snapshot.val()[this.state.sortpath]),
          name: (snapshot.val().name),
          streak: (snapshot.val().streak)
        });
        if (this.state.section !== 'achievements/') {
          this.setState({ highScoreList: lista.sort((a, b) => a.hours - b.hours) })
        }
      });
    }


  }



  render() {
    console.log(this.state.sortpath)
    console.log(this.state.highScoreList)
    if (this.state.highScoreList.length && (this.state.sortpath.startsWith('before8') || this.state.sortpath.startsWith('streak'))) {
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
            <AchievementsCustomTable navigation={this.props.navigation} list={this.state.highScoreList} name={this.state.username}></AchievementsCustomTable>
          </ScrollView>
        </View>
      )
    }
    else if (this.state.highScoreList.length) {
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
