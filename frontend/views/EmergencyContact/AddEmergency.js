import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../../constants/colors";
import { Picker } from "@react-native-community/picker";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Table, Rows } from "react-native-table-component";
import axios from "react-native-axios/lib/axios";
import appInputStyle from "../../constants/appInput";
import appButtonStyle from "../../constants/appButton";
import profileImage from '../../constants/profileImage';
import Toast from 'react-native-toast-message';

export default function AddEmergency({ navigation }) {

    const [doctors, setDoctors] = useState([["Select Doctor", null]]);

    const [currentSelection, setCurrentSelection] = useState(null)

    const [currentDoctors, setCurrentDoctors] = useState([{ "userId": "1", "name": "Dhruvil", "profilePicture": "male-avatar-1.png" }, { "userId": "2", "name": "Shivang", "profilePicture": "male-avatar-2.png" }])

    useEffect(() => {
        //axios call to get all the doctors

        // axios.get(`${config.basepath}/getDoctors`)
        // .then(response=>{
        //     setDoctors()
        // })  
        let allDoctors = [
            {
                "userId": "1",
                "name": "Dhruvil"
            },
            {
                "userId": "2",
                "name": "Shivang"
            },
            {
                "userId": "3",
                "name": "Saumil"
            },
            {
                "userId": "4",
                "name": "Pooja"
            }
        ]
        let selection = []
        let filteredDoctors = allDoctors.filter(function (array_el) {

            return currentDoctors.filter(function (anotherOne_el) {
                if (anotherOne_el.userId != array_el.userId) {
                    let temp = [];
                    temp.push(array_el.name);
                    temp.push(array_el.userId);
                    selection.push(temp)

                }
                return anotherOne_el.userId == array_el.userId;
            }).length == 0
        })
        console.log(selection)
        setDoctors(prev => [...prev, ...selection])
    }, [])

    const requestDoctor = () => {
        const data = {
            toUser: currentSelection
        }
        // axios.post(`${config.basepath}/addDoctor`,data)
        // .then(response => {
        //     if(response.status===200) {
                Toast.show({
                    text1: 'Add Doctor',
                    text2: 'Request is sent to doctor'
                })
        //     }
        // })
        // .catch(err=> {
        //     console.log(err)
        // })
    }


    return (
        <ScrollView style={styles.tableContainer}>

            {/* Add Doctor */}
            <View style={{ alignItems: 'center' }}>
                <View style={appInputStyle.container}>
                    <Picker
                        selectedValue={currentSelection}
                        style={appInputStyle.picker}
                        onValueChange={(itemValue) => setCurrentSelection(itemValue)}
                    >
                        {doctors.map((c, index) => {
                            return <Picker.Item key={index} label={c[0]} value={c[1]} />;
                        })}
                    </Picker>
                </View>
                <View style={{ margin: 10, width: '50%' }}>
                    <TouchableOpacity style={[appButtonStyle.button, { paddingVertical: 15 }]} onPress={requestDoctor}>
                        <Text style={appButtonStyle.text}>Add Doctor</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 30 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.text }}>Current Doctors</Text>
                </View>
                <View style={{ marginVertical: 15 }}>
                    {
                        currentDoctors.map((doctor, i) => {
                            return <View key={i} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:Colors.white, borderRadius:20, marginTop: 10, padding:10 }}>
                                <View style={{marginRight: 20, marginLeft:20}}>
                                    <Image style={{ width: 40, height: 40 }} source={profileImage[doctor.profilePicture]} />
                                </View>
                                <View style={{}}>
                                    <Text style={{ fontSize: 17 }}> Dr. {doctor.name} </Text>
                                </View>
                            </View>
                        })
                    }
                </View>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    }
});
