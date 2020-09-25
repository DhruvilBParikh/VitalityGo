import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from '../../constants/colors';

export default function Gender({ navigation }) {
  
  const [isMale, setIsMale] = useState();  // set default to null
  const [backgroundColor1, setBackgroundColor1] = useState('white');
  const [backgroundColor2, setBackgroundColor2] = useState('white');

  const handleGender = gender => {
    if(gender=='male') {
      if(isMale==null || isMale==false) {
        setBackgroundColor1(Colors.accent)
        setBackgroundColor2('white')
        setIsMale(true)
      } else {
        setBackgroundColor1('white')
        setIsMale(null)
      }
    } else {
      if(isMale==null || isMale==true) {
        setBackgroundColor1('white')
        setBackgroundColor2(Colors.accent)
        setIsMale(false)
      } else {
        setBackgroundColor2('white')
        setIsMale(null)
      }
    }
  }

  return (
    <View style={styles.container}>
      
      {/* Title */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 25 }}> Which one are you? </Text>
      </View>

      {/* Gender of User */}
      <View style={{ flexDirection: 'row', margin: 25, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={[styles.whiteBackground, {backgroundColor:backgroundColor1}]} activeOpacity={0.9} onPress={()=>handleGender('male')} >
            <Image source={require('../../assets/images/gender-male.png')} style={styles.maleImage} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.text }}>Male</Text>
        </View>

        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity style={[styles.whiteBackground, {backgroundColor:backgroundColor2}]} activeOpacity={0.9} onPress={()=>handleGender('female')}>
            <Image source={require('../../assets/images/gender-female.png')} style={styles.femaleImage} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.text }}>Female</Text>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity activeOpacity={0.9} style={styles.continueButton} onPress={() => isMale
            ? navigation.navigate("ProfilePictureMale")
            : navigation.navigate("ProfilePictureFemale")}>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 30,
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5
  },
  maleImage: {
    width: 40,
    height: 75
  },
  femaleImage: {
    width: 50,
    height: 75
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
