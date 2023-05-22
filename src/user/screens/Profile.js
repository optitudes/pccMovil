import { useNavigation } from '@react-navigation/core';
import { Box, Pressable, Text, ScrollView, HStack, VStack, useDisclose, Actionsheet, Avatar, Divider } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import NotificationsBell from '../../components/NotificationsBell';
import authContext from '../../context/authContext';

import colors from '../../constants/colors';

let directAccess = [
    {
        label: "Noticias",
        navigateTo: "news",
        iconName: "newspaper-variant-outline"
    },
    {
        label: "Proyectos",
        navigateTo: "projects",
        iconName: "microscope"
    },
    {
        label: "Videos",
        navigateTo: "videos",
        iconName: "video-box"
    },
    {
        label: "Podcasts",
        navigateTo: "podcasts",
        iconName: "account-voice"
    },
    {
        label: "Imagenes",
        navigateTo: "images",
        iconName: "image-area"
    },
]

const Profile = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                _contentContainerStyle={{
                    minW: "72",
                    backgroundColor: colors.SECUNDARY1,
                    pb: "24"
                }}
                style={{ backgroundColor: colors.SECUNDARY1 }}
                bounces={false}
            >
                <VStack background={colors.PRIMARY1}>

                    <UserInfoHeader />
                    <VStack pt="5" backgroundColor="white" borderTopRadius="3xl">
                        <Box
                            flex="1"
                            maxHeight="72"
                            marginX="5"
                            borderRadius="md"
                            marginY="5"
                            flexWrap="wrap"
                            flexDirection="row"
                            background={colors.PRIMARY3}
                            borderWidth={"1"}
                            borderColor={colors.PRIMARY2}
                            pt="5"
                        >
                            {directAccess.map((element, index) => (

                                <CardDirectAccess item={element} key={index} />


                            ))}
                        </Box>
                    </VStack>

                </VStack>


            </ScrollView>
            <FAB
                onPress={() => navigation.navigate("contact")}
                icon={{ name: "face-agent", type: "material-community", color: colors.SECUNDARY1 }}
                style={{ padding: 0 }}
                background={TouchableNativeFeedback.Ripple(colors.SECUNDARY2, false)}

                buttonStyle={{ flexDirection: "column", width: 70, paddingVertical: 14, margin: 0, borderRadius: 25 }}
                containerStyle={{ position: "absolute", bottom: 25, right: 25, flexDirection: "column", padding: 0, borderRadius: 25 }}
            />
        </SafeAreaView >
    )
}

const UserInfoHeader = () => {
    const { userInfo } = useContext(authContext);

    return (
        <HStack padding="3"
            justifyContent="space-between" alignItems="center"
            mb="1"
        >
            <Text fontSize="xl" fontWeight="bold" color="white">Hola! Juan</Text>
            <NotificationsBell />
        </HStack>)

}



const CardDirectAccess = ({ item }) => {

    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => navigation.navigate(item.navigateTo)}
            marginX="3"
            marginY="3"
            flex="1"
            style={{ minWidth: 66 }}
            minHeight="16"
            maxHeight="32"

        >
            {({ isHovered, isFocused, isPressed }) => (
                <Box

                    flex="1"
                    borderRadius="xl"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Icon type="material-community" color= {colors.TERCIARY1} name={item.iconName} />

                    <Text fontWeight="light" fontSize="xs" textAlign="center" color={"teal.800"}>{item.label}</Text>

                </Box>)}
        </Pressable>


    )
}

export default Profile;