import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function HeaderTitle() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Image
                style={{ width: 100, height: 100 }}
                source={require('../../assets/images/logo.png')}
            />
            <View />
        </View>
    );
}

const styles = StyleSheet.create({

})