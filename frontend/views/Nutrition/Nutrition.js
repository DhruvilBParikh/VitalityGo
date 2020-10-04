import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from '../../constants/colors'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from "react-native-svg";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { Col, Row, Grid } from 'react-native-easy-grid';
import { Table, Rows, Row } from 'react-native-table-component';

export default function Nutrition() {

  const [tableData, setTableData] = useState([['Fat', '20g', '27%'], ['Carb', '60g', '30%'], ['Protein', '100g', '63%']])

  return (
    
    <ScrollView style={styles.tableContainer}>
      {/* Calories gained */}
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.text, marginHorizontal: 50, textAlign: 'center' }}>You gained <Text style={{ color: '#7260BC' }}> 850 </Text> calories today</Text>
      </View>

      {/* Summary Graph */}
      <View style={{ marginVertical: 20, paddingVertical: 20, marginHorizontal:5, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', borderRadius: 20 }}>
        <View>
          <AnimatedCircularProgress
            size={140}
            width={15}
            fill={27}
            rotation={0}
            tintColor="#8378FE"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#DAD8FB"
            lineCap='round' />
          <AnimatedCircularProgress
            size={100}
            width={15}
            fill={30}
            rotation={0}
            tintColor="#948BFD"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#DAD8FB"
            lineCap='round'
            style={{ position: "absolute", top: 20, left: 20 }} />
          <AnimatedCircularProgress
            size={60}
            width={15}
            fill={63}
            rotation={0}
            tintColor="#A59EFD"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#DAD8FB"
            lineCap='round'
            style={{ position: "absolute", top: 40, left: 40 }} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableWithoutFeedback style={{ backgroundColor: '#8378FE', width: 22, height: 22, borderRadius: 11 }} />
            <Text style={{ color: '#8378FE', marginLeft: 10 }}>Fat 27%</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableWithoutFeedback style={{ backgroundColor: '#948BFD', width: 22, height: 22, borderRadius: 11, marginTop: 20 }} />
            <Text style={{ color: '#948BFD', marginTop: 20, marginLeft: 10 }}>Carb 30%</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableWithoutFeedback style={{ backgroundColor: '#A59EFD', width: 22, height: 22, borderRadius: 11, marginTop: 20 }} />
            <Text style={{ color: '#A59EFD', marginTop: 20, marginLeft: 10 }}>Protien 63%</Text>
          </View>
        </View>
      </View>
      <Table borderStyle={{ borderColor: '#000' }} style={{ justifyContent: 'space-around' }}>
        <Rows data={tableData} textStyle={styles.text} style={{ borderBottomWidth: 1, paddingLeft: 60, borderColor: Colors.text }} />
      </Table>

      <View style={{ backgroundColor: 'white', marginTop:30, padding:15, borderRadius:20, marginHorizontal:5 }}>
        <Text style={{fontWeight:'bold', fontSize:25, color:Colors.text}}>Breakfast</Text>
        {/* List */}
        <View style={{margin:5, padding:10, flexDirection:'row', justifyContent:"space-between", borderBottomWidth:2, borderColor:'#BBADAD'}}>
          <Text style={{color:Colors.text, fontSize:20}}>Eggs {"\n"}<Text style={{color:"#BBADAD", fontSize:15}}>200 grams</Text></Text>
          <Text style={{textAlign:"right", color:Colors.text, fontSize:20}}>100 cal</Text>
        </View>
        <View style={{margin:5, padding:10, flexDirection:'row', justifyContent:"space-between", borderBottomWidth:2, borderColor:'#BBADAD'}}>
          <Text style={{color:Colors.text, fontSize:20}}>Fries {"\n"}<Text style={{color:"#BBADAD", fontSize:15}}>100 grams</Text></Text>
          <Text style={{textAlign:"right", color:Colors.text, fontSize:20}}>50 cal</Text>
        </View>
      </View>

      <View style={{ backgroundColor: 'white', marginTop:30, padding:15, borderRadius:20, marginHorizontal:5 }}>
        <Text style={{fontWeight:'bold', fontSize:25, color:Colors.text}}>Lunch</Text>
        {/* List */}
        <View style={{margin:5, padding:10, flexDirection:'row', justifyContent:"space-between", borderBottomWidth:2, borderColor:'#BBADAD'}}>
          <Text style={{color:Colors.text, fontSize:20}}>Chicken {"\n"}<Text style={{color:"#BBADAD", fontSize:15}}>200 grams</Text></Text>
          <Text style={{textAlign:"right", color:Colors.text, fontSize:20}}>150 cal</Text>
        </View>
        <View style={{margin:5, padding:10, flexDirection:'row', justifyContent:"space-between", borderBottomWidth:2, borderColor:'#BBADAD'}}>
          <Text style={{color:Colors.text, fontSize:20}}>Rice {"\n"}<Text style={{color:"#BBADAD", fontSize:15}}>100 grams</Text></Text>
          <Text style={{textAlign:"right", color:Colors.text, fontSize:20}}>300 cal</Text>
        </View>
      </View>

      <View style={{ backgroundColor: 'white', marginTop:30, padding:15, borderRadius:20, marginHorizontal:5 }}>
        <Text style={{fontWeight:'bold', fontSize:25, color:Colors.text}}>Dinner</Text>
        {/* List */}
        <View style={{margin:5, padding:10, flexDirection:'row', justifyContent:"space-between", borderBottomWidth:2, borderColor:'#BBADAD'}}>
          <Text style={{color:Colors.text, fontSize:20}}>Chicken {"\n"}<Text style={{color:"#BBADAD", fontSize:15}}>200 grams</Text></Text>
          <Text style={{textAlign:"right", color:Colors.text, fontSize:20}}>150 cal</Text>
        </View>
        <View style={{margin:5, padding:10, flexDirection:'row', justifyContent:"space-between", borderBottomWidth:2, borderColor:'#BBADAD'}}>
          <Text style={{color:Colors.text, fontSize:20}}>Eggs {"\n"}<Text style={{color:"#BBADAD", fontSize:15}}>200 grams</Text></Text>
          <Text style={{textAlign:"right", color:Colors.text, fontSize:20}}>100 cal</Text>
        </View>
      </View>

      <View style={{marginTop:50}}></View>
      {/* </View> */}




      {/* <Grid style={{ marginVertical: 10 }}>
        <Row size={1} style={{backgroundColor:'red'}}>
          <Col><Text>Fat</Text></Col>
          <Col><Text>20g</Text></Col>
          <Col><Text>27%</Text></Col>
        </Row>
        <Row size={1} style={{backgroundColor:'green'}}>
          <Col><Text>Fat</Text></Col>
          <Col><Text>20g</Text></Col>
          <Col><Text>27%</Text></Col>
        </Row>
        <Row size={1} style={{backgroundColor:'yellow'}}>
          <Col><Text>Fat</Text></Col>
          <Col><Text>20g</Text></Col>
          <Col><Text>27%</Text></Col>
        </Row> */}


      {/* <Col>

          <Row style={{ height: 40 }}><Text>Fat</Text></Row>
          <Row style={{ height: 40 }}><Text>Carb</Text></Row>
          <Row style={{ height: 40 }}><Text>Protein</Text></Row>

        </Col>
        <Col>

          <Row style={{ height: 40 }}><Text>20g</Text></Row>
          <Row style={{ height: 40 }}><Text>60g</Text></Row>
          <Row style={{ height: 40 }}><Text>100g</Text></Row>

        </Col>
        <Col>

          <Row style={{ height: 40 }}><Text>27</Text></Row>
          <Row style={{ height: 40 }}><Text>30</Text></Row>
          <Row style={{ height: 40 }}><Text>63</Text></Row>

        </Col> */}
      {/* </Grid> */}

      {/* <View style={{ marginVertical: 10 }}>
        <View style={styles.summaryContainer}>
          <View>
            <Text style={styles.summaryText}>Fat</Text>
          </View>
          <View>
            <Text style={styles.summaryText}>20g</Text>
          </View>
          <View>
            <Text style={styles.summaryText}>27%</Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View>
            <Text style={styles.summaryText}>Carb</Text>
          </View>
          <View>
            <Text style={styles.summaryText}>60g</Text>
          </View>
          <View>
            <Text style={styles.summaryText}>30%</Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View>
            <Text style={styles.summaryText}>Protien</Text>
          </View>
          <View>
            <Text style={styles.summaryText}>100g</Text>
          </View>
          <View>
            <Text style={styles.summaryText}>63%</Text>
          </View>
        </View>
      </View> */}
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingVertical: 20
  },
  summaryContainer: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.text,
    justifyContent: 'space-evenly',
  },
  summaryText: {
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 10
  },
  tableContainer: { flex: 1, paddingTop: 30, backgroundColor: Colors.background },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 10, fontSize: 18, color: Colors.text }
})
