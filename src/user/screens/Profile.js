import { View, Pressable, Text, ScrollView, HStack, VStack, useDisclose, Actionsheet, Avatar, Divider } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import Login from "../../screens/auth/Login";
import authContext from '../../context/authContext';



const Profile = ({ navigation }) => {
const { authenticated, userInfo} = useContext(authContext);
useEffect(() => {
    console.log(userInfo);
},[]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {authenticated?
            <View><Text>{userInfo.name??"crazy"}</Text>
            <Text>{userInfo.userType.name??"crazy"}</Text>
            <Text>{userInfo.userType.description??"crazy"}</Text>
            <Text>{userInfo.userType.levelAccess??"crazy"}</Text>

            {userInfo.participantInfo.map((participant) => (
                <View key={participant.name}>
                <Text>{participant.name}</Text>
                <Text>{participant.description}</Text>
                </View>
            ))}
            
            </View>
            :<Login></Login>}
        </SafeAreaView >
    )
}

export default Profile;