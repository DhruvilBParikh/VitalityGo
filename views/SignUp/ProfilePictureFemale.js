import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from '../../constants/colors';

export default function ProfilePictureMale({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Title */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 25 }}> Choose your profile picture </Text>
      </View>

      {/* Avatar of User */}
      <View style={{ flexDirection: 'row', margin: 25, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.8} >
            <Image source={require('../../assets/images/female-avatar-1.png')} style={styles.femaleImage} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.8} >
            <Image source={require('../../assets/images/female-avatar-2.png')} style={styles.femaleImage} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.8} >
            <Image source={require('../../assets/images/female-avatar-3.png')} style={styles.femaleImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity activeOpacity={0.9} style={styles.continueButton} onPress={() => navigation.navigate("Home")}>
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
    justifyContent: 'center'
  },
  whiteBackground: {
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 130,
    height: 130,
    margin: 10,
  },
  femaleImage: {
    width:100,
    height:100
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

