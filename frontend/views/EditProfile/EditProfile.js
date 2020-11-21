import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Picker } from "@react-native-community/picker";

import appInputStyle from '../../constants/appInput'
import Colors from '../../constants/colors';
import AppButton from '../../components/AppButton/AppButton';
import ValidationMsg from '../../components/ValidationMsg/ValidationMsg';
import axios from "axios";
import config from "../../constants/config";

const EditProfile = ({ navigation }) => {
    const state = useSelector(state => state)
    const [height, setHeight] = useState(state.patientData.Data.height)
    const [weight, setWeight] = useState(state.patientData.Data.weight)
    const [caloriesGoal, setCaloriesGoal] = useState(state.patientData.caloriesGoal.toString())
    const [waterGoal, setWaterGoal] = useState(state.patientData.waterGoal.toString())

    const [showCaloriesError, setShowCaloriesError] = useState(false)
    const [showWaterError, setShowWaterError] = useState(false)

    const heights = [];
    for (let i = 100; i < 300; i++) {
        heights.push([i.toString() + " cm", i]);
    }

    const weights = [];
    for (let i = 140; i <= 320; i++) {
        weights.push([i.toString() + " lb", i]);
    }

    const editHandler = () => {
        //edit profile
        let navigate = true;

        if (parseInt(caloriesGoal) < 800 || parseInt(caloriesGoal) > 3000) {
            navigate = false;
            setShowCaloriesError(true);
        } else {
            setShowCaloriesError(false);
        }

        if (parseInt(waterGoal) < 6 || parseInt(waterGoal) > 20) {
            navigate = false;
            setShowWaterError(true);
        } else {
            setShowWaterError(false);
        }

        if (navigate) {
            const data = {
                height,
                weight
            }
            axios
                .put(
                    `${config.basepath}/api/users/${state.userData._id}/editUserInfo`,
                    data,
                    { headers: { Authorization: `Bearer ${state.token}` } }
                )
                .then((response) => {
                    if (response.status === 200) {
                        console.log(
                            "Update UserInfo response: ",
                            response.data.msg
                        );
                        const goalsData = {
                            caloriesGoal: parseInt(caloriesGoal),
                            waterGoal: parseInt(waterGoal),
                        };
                        console.log("Goals data to be sent:::", goalsData)
                        axios
                            .put(
                                `${config.basepath}/api/users/${state.userData._id}/setGoal`,
                                goalsData,
                                { headers: { Authorization: `Bearer ${state.token}` } }
                            )
                            .then((response1) => {
                                console.log("Set Goal Response: ", response1)
                                if (response1.status === 200) {
                                    console.log(
                                        "Update Goal response: ",
                                        response1.data.msg
                                    );

                                    navigation.pop(1);
                                    navigation.replace("Home");
                                }
                            })
                            .catch((err) => {
                                console.log("Add food error: ", err);
                            });
                    }
                })
                .catch((err) => {
                    console.log("Get nutrition error: ", err);
                });
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Information</Text>
            </View>

            <View style={appInputStyle.container}>
                <Image
                    source={require("../../assets/images/height-icon.png")}
                    style={appInputStyle.image}
                />
                <Picker
                    selectedValue={height}
                    style={appInputStyle.picker}
                    onValueChange={(itemValue) => setHeight(itemValue)}
                >
                    {heights.map((wt, index) => {
                        return <Picker.Item key={index} label={wt[0]} value={wt[1]} />;
                    })}
                </Picker>
            </View>
            <View style={appInputStyle.container}>
                <Image
                    source={require("../../assets/images/weight-icon.png")}
                    style={appInputStyle.image}
                />
                <Picker
                    selectedValue={weight}
                    style={appInputStyle.picker}
                    onValueChange={(itemValue) => setWeight(itemValue)}
                >
                    {weights.map((wt, index) => {
                        return <Picker.Item key={index} label={wt[0]} value={wt[1]} />;
                    })}
                </Picker>
            </View>

            <View>
                <Text style={styles.title}>Goal</Text>
            </View>
            <View style={appInputStyle.container}>
                <View style={{ width: '25%' }}>
                    <Text>Calories:</Text>
                </View>

                <TextInput
                    keyboardType="number-pad"
                    value={caloriesGoal}
                    onChangeText={(text) => setCaloriesGoal(text)}
                    style={appInputStyle.placeholder}
                />
            </View>
            {showCaloriesError && <ValidationMsg message="Enter Calories between 800 to 3000" />}
            <View style={[appInputStyle.container, { marginBottom: 40 }]}>
                <View style={{ width: '25%' }}>
                    <Text>Water:</Text>
                </View>
                <TextInput
                    keyboardType="number-pad"
                    value={waterGoal}
                    onChangeText={(text) => setWaterGoal(text)}
                    style={appInputStyle.placeholder}
                />
            </View>
            {showWaterError && <ValidationMsg message="Enter Water Glasses between 6 to 20" />}
            <AppButton title="Save Changes" clickHandler={editHandler} />


        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    title: {
        marginVertical: 5,
        fontSize: 32,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
