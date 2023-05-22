import { useNavigation } from '@react-navigation/core';
import { Box, Pressable, Text, ScrollView, HStack, VStack } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView} from "react-native";
import { Icon } from 'react-native-elements/dist/icons/Icon';
import NotificationsBell from '../../components/NotificationsBell';
import authContext from '../../context/authContext';



import colors from '../../constants/colors';
import LastProjects from '../../components/LastProjects';
import LastVideos from '../../components/LastVideos';
import LastPictures from '../../components/LastPictures';
import LastPodcast from '../../components/LastPodcast';






let directAccess = [
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

const Start = ({ navigation }) => {
    const [projects, setProjects] = useState([]);


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
                        <LastProjects />
                        <LastVideos />
                        <LastPictures />
                        <LastPodcast />



                    </VStack>

                </VStack>


            </ScrollView>
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
export default Start;