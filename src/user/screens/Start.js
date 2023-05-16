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

const Start = ({ navigation }) => {

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
                    // background={isPressed ? "teal.700" : "white"}

                    // shadow="0"
                    flex="1"
                    // p="3"
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
/*
const LastNews = () => {

    const isFocused = useIsFocused()
    const carouselRef = React.createRef();
    const [list, setList] = useState({
        data: [],
        loading: true,
    });
    const navigation = useNavigation();
    const [paginationState, setPaginationState] = useState({
        entries: 1,
        activeSlide: 0,
    });

    const renderItem = ({ item, index }) => {
        return <NewsCard item={item} horizontal={true} />;
    };


    useEffect(() => {
        let mounted = true;
        const request = async () => {
            try {
                const res = await httpClient.get("/news")


                if (mounted) {
                    if (res.data.status === "success") {

                        let firstNews = res.data.data.data.splice(0, 6);

                        setPaginationState({ ...paginationState, entries: firstNews.length })
                        setList({
                            data: firstNews,
                            loading: false
                        })
                    } else {
                        setList({
                            ...list,
                            loading: false
                        })
                    }
                }
            } catch (error) {
                if (mounted) {
                    // client received an error response (5xx, 4xx)

                    const { title, body } = evaluateResponseError(error);
                    Alert.alert(title, body, [
                        {
                            text: "OK",
                            style: "cancel",
                            onPress: () => {
                                if (mounted) {
                                    setList({
                                        data: [],
                                        loading: false
                                    });
                                }
                            }
                        },
                    ]);
                }
            }
        }


        if (isFocused) {
            request()
        }

        return () => {
            mounted = false;
        };
    }, [isFocused]);


    return (<Box marginX="5"
        borderRadius="md"
        marginY="5"
        borderWidth={"1"}
        borderColor={"gray.200"}
        background={"gray.50"}
        alignItems="center"
    >


        <HStack paddingX="5" pt="5" width={"100%"} borderTopRadius={"sm"} mb="4" justifyContent={"space-between"}>

            <Text fontSize={"xl"} color="gray.600" fontWeight={"semibold"} >Últimas noticias</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("news")}
                style={{
                    backgroundColor: "#E75480",
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 2
                }}>
                <Text fontSize="md" fontWeight="semibold" color="gray.50"

                >Ver más</Text>
            </TouchableOpacity>
        </HStack>
        <Divider />
        <Carousel
            ref={carouselRef}
            data={list.data}
            renderItem={renderItem}
            sliderWidth={
                Dimensions.get("window").width -
                (Platform.OS == "ios" ? 60 : 42)
            } // este debe ser el responsive
            itemWidth={305}

            contentContainerCustomStyle={{
                paddingVertical: 5,
            }}
            containerCustomStyle={{
                height: 320,
                paddingVertical: 10,
            }}
            ListEmptyComponent={<Box width="100%">
                <Text width={"100%"} display={"flex"} textAlign={"center"}>Aún no hay noticias...</Text>
            </Box>}
            onSnapToItem={(index) =>
                setPaginationState({
                    ...paginationState,
                    ["activeSlide"]: index,
                })
            }
        />
        <Pagination
            dotsLength={paginationState.entries}
            activeDotIndex={paginationState.activeSlide}
            containerStyle={{ backgroundColor: "transparent", marginTop: 2 }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: "#115e59",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />

    </Box>)
}
*/
export default Start;