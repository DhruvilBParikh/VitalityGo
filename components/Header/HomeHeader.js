import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function HomeHeader() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
            <TouchableOpacity activeOpacity={0.7}>
                <Image
                    style={{ width: 22, height: 19 }}
                    source={require('../../assets/images/drawer-opener.png')}
                />
            </TouchableOpacity>
            <Image
                style={{ width: 100, height: 100 }}
                source={require('../../assets/images/logo.png')}
            />
            <TouchableOpacity activeOpacity={0.7}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../../assets/images/male-avatar-1.png')}
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

})