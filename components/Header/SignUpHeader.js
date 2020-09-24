import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function SignUpHeader({navigation}) {
    return (
        <View style={{overflow:"hidden", paddingBottom:5}}>
            <View style={styles.headerContainer}>
                <View style={styles.backButton} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 30, width: 30 }} activeOpacity={0.9}>
                        <Image source={require('../../assets/images/back-button.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.logo}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
                </View>
                <View style={styles.space} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        shadowOpacity: 0.25,
        elevation: 5
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
    }
})