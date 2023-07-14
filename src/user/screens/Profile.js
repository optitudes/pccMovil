import { Box, Pressable, Text, ScrollView, HStack, VStack, useDisclose, Actionsheet, Avatar, Divider } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import Login from "../../screens/auth/Login"



const Profile = ({ navigation }) => {
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Login></Login>
            
        </SafeAreaView >
    )
}

export default Profile;