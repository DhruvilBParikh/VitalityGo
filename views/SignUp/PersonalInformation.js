import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import Colors from '../../constants/colors'

export default function PersonalInformation({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Title */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 25, marginTop: 50 }}> Personal Information </Text>
      </View>

      {/* Height */}
      <View style={styles.textInputContainer}>
        <Image source={require('../../assets/images/height-icon.png')} style={{ width: 25, height: 25 }} />
        <TextInput placeholder='Height' style={{ marginLeft:15, paddingHorizontal: 5, fontSize:15, color: Colors.text }} />
      </View>
      
      {/* Weight */}
      <View style={styles.textInputContainer}>
        <Image source={require('../../assets/images/weight-icon.png')} style={{ width: 25, height: 25 }} />
        <TextInput placeholder='Weight' style={{ marginLeft:15, paddingHorizontal: 5, fontSize:15, color: Colors.text }} />
      </View>

      {/* Blood Group */}
      <View style={styles.textInputContainer}>
        <Image source={require('../../assets/images/blood-group-icon.png')} style={{ width: 25, height: 25 }} />
        <TextInput placeholder='Blood Group' style={{ marginLeft:15, paddingHorizontal: 5, fontSize:15, color: Colors.text }} />
      </View>

      {/* Birth Date */}
      <View style={styles.textInputContainer}>
        <Image source={require('../../assets/images/calendar-icon.png')} style={{ width: 25, height: 25 }} />
        <TextInput placeholder='Birthdate (mm/dd/yyyy)' style={{ marginLeft:15, paddingHorizontal: 5, fontSize:15, color: Colors.text }} />
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.continueButton} onPress={() => navigation.navigate("Gender")}>
        <Text style={styles.buttonText}> Continue </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center'
  },
  textInputContainer: {
    backgroundColor: 'white', 
    width: '75%', 
    marginTop: 40, 
    height: 40, 
    alignItems: 'center', 
    paddingLeft: 10, 
    flexDirection: 'row', 
    borderRadius: 10, 
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5
  },
  continueButton: {
    margin: 40,
    borderRadius: 30,
    backgroundColor: Colors.buttonColor,
    width: 272,
    maxWidth: '80%',
    height: 62,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
})
