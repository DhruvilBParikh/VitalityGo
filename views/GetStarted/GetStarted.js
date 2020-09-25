import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors'

export default function GetStarted({navigation}) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo-main-screen.png')} style={styles.logo} />
            <Text style={styles.welcomeText}>Welcome to Vitality Go</Text>
            <ImageBackground source={require('../../assets/images/white-background.png')} style={styles.whiteBackground}>
                <Image source={require('../../assets/images/get-started.png')} style={styles.getStartedImage} />
            </ImageBackground>
            <TouchableOpacity activeOpacity={0.9} style={styles.getStartedButton} onPress={() => navigation.navigate("UserType")}>
                <Text style={styles.buttonText}> Get Started </Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={{color: Colors.text, fontSize:18, fontWeight: "bold"}}> Already have an account? </Text>
                <Text onPress={() => navigation.navigate("Login")} style={{color: Colors.accent, fontSize:18, fontWeight: "bold"}}> Sign in </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.background,
        alignItems:'center'
    },
    logo: {
        marginTop: 20,
        width: 240,
        height: 240
    },
    welcomeText: {
        marginTop:-20,
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 20
    },
    getStartedImage: {
        width: 384,
        height: 208
    },
    whiteBackground: {
        alignItems: 'center',
        justifyContent:'center',
        marginVertical: 50,
        width: '100%',
        height: 310
    },
    getStartedButton: {
        borderRadius: 30,
        backgroundColor: Colors.accent,
        width: 272,
        maxWidth: '80%',
        height: 62,
        shadowOffset: {width:0, height:2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
