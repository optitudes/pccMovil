import { useNavigation } from '@react-navigation/core';
import { Box, Pressable, Text, ScrollView, HStack, VStack, useDisclose, Actionsheet, Avatar, Divider } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import NotificationsBell from '../../components/NotificationsBell';
import authContext from '../../context/authContext';

import colors from '../../constants/colors';



const Profile = ({ navigation }) => {
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>hola mundo</Text>
            
        </SafeAreaView >
    )
}

export default Profile;