import Colors from './colors'
import React from 'react'
import {Image} from 'react-native'
import HeaderTitle from '../components/Header/HeaderTitle'
import HomeHeader from '../components/Header/HomeHeader'
import NutritionHeader from '../components/Header/NutritionHeader'

export default {
    signUpHeaderOptions: {
        headerShown: true, headerBackImage: () => (<Image style={{ marginLeft: 10 }} source={require('../assets/images/back-button.png')} />),
        headerTitle: (props) => (<HeaderTitle />),
        headerStyle: { height: 120, backgroundColor: Colors.background }
    },
    homeHeaderOptions: {
        headerShown: true, headerBackImage: () => (<Image style={{ marginLeft: 10 }} source={require('../assets/images/back-button.png')} />),
        headerTitle: (props) => (<HomeHeader />),
        headerStyle: { height: 120, backgroundColor: Colors.background }
    },
    nutritionHeaderOptions: {
        headerShown: true, headerBackImage: () => (<Image style={{ marginLeft: 10 }} source={require('../assets/images/back-button.png')} />),
        headerTitle: (props) => (<NutritionHeader />),
        headerStyle: { height: 120, backgroundColor: Colors.background }
    }
} 