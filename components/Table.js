import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
 
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Rank', 'User', 'Hours', 'Streak'],
      widthArr: [100,100,100,100]
    }
  }
 
  render() {
    const state = this.state;
    //const tableData = [[1,2,3,4],[1,2,'Torjus Schaathun',4],[2,3,4,5],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    const tableData = this.props.list
    console.log(tableData)

 
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: 'black'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headerText}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: 'black'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#A7CFDB'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#047E96' },
  headerText: {textAlign: 'center', color: 'black', fontWeight:'bold', fontSize: 18},
  text: { textAlign: 'center', fontWeight: '100', fontSize: 18 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#53ACBC' }
});