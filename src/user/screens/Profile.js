import { Box, Pressable, Text, ScrollView, HStack, VStack, useDisclose, Actionsheet, Avatar, Divider } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import Login from "../../screens/auth/Login";
import authContext from '../../context/authContext';



const Profile = ({ navigation }) => {
const { authenticated} = useContext(authContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {authenticated?<Text>Estas logeado</Text>:<Login></Login>}
        </SafeAreaView >
    )
}

export default Profile;