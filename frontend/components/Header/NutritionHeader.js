import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function HomeHeader() {
    return (
        <View style={{ flex:1,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
            <View />
            <View>
                <Text style={{ color: '#474444', fontSize:22, fontWeight:'bold', marginLeft:-20 }}>Nutrition</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
                <Image
                    source={require('../../assets/images/add-button.png')}
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

})