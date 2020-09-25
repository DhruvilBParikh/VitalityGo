import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";
import SignUpHeader from "../../components/Header/SignUpHeader";
import Colors from '../../constants/colors'

export default function UserType({ navigation }) {
  return (
    <View style={styles.container}>

      {/* header */}
      {/* <SignUpHeader /> */}
      {/* <View style={styles.headerContainer}>
        <View style={styles.backButton} >
          <TouchableOpacity onPress={() => navigation.navigate("GetStarted")} style={{ height: 30, width: 30 }} activeOpacity={0.9}>
            <Image source={require('../../assets/images/back-button.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.logo}>
          <Image source={require('../../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
        </View>
        <View style={styles.space} />
      </View> */}

      {/* Input name */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 25}}> You are... </Text>
      </View>
      <View style={{ backgroundColor: 'white', width: '75%', margin: 40, height: 40, alignItems: 'center', paddingLeft: 10, flexDirection: 'row', borderRadius: 10, elevation: 5 }}>
        <Image source={require('../../assets/images/user-icon.png')} style={{ width: 25, height: 25 }} />
        <TextInput placeholder='Full Name' style={{ marginLeft:15, paddingHorizontal: 5, fontSize:15, color: Colors.text }} />
      </View>

      {/* Type of User */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 25 }}> What type of user? </Text>
      </View>
      <View style={{ flexDirection: 'row', margin: 25, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.9} >
            <Image source={require('../../assets/images/user-doctor.png')} style={styles.userTypeImage} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.text }}>Doctor</Text>
        </View>

        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.9}>
            <Image source={require('../../assets/images/user-general.png')} style={styles.userTypeImage} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.text }}>General</Text>
        </View>

      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.continueButton} onPress={() => navigation.navigate("PersonalInformation")}>
        <Text style={styles.buttonText}> Continue </Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent:'center'
  },
  backButton: {
    flex: 1,
    marginLeft: 20
  },
  logo: {
    flex: 1,
  },
  space: {
    flex: 1
  },
  textInputContainer: {
    backgroundColor: 'white', 
    width: '75%', 
    margin: 40, 
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
  whiteBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 30,
    backgroundColor: 'white',
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5
  },
  userTypeImage: {
    width: 100,
    height: 100
  },
  continueButton: {
    margin: 30,
    borderRadius: 30,
    backgroundColor: Colors.accent,
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
