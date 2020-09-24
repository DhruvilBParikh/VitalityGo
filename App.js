import {StatusBar} from 'expo-status-bar'
import React from 'react';
import { StyleSheet, View } from 'react-native';
import GetStarted from './screens/GetStarted'
import Colors from './constants/colors'

export default function App() {
  return (
    <View style={styles.container}>
      <GetStarted />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%'
  }
});
