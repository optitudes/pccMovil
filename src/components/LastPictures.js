import { useNavigation } from '@react-navigation/core';
import { Box, Text, HStack, Divider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import httpClient from '../config/httpClient';
import PictureCard from './PictureCard';




import colors from '../constants/colors';


const LastPictures = () => {

    const isFocused = useIsFocused()
    const carouselRef = React.createRef();
    const [projectList, setProjectList] = useState({
        data: [],
        loading: true,
    });
    const navigation = useNavigation();
    const [paginationState, setPaginationState] = useState({
        entries: 1,
        activeSlide: 0,
    });

    const renderItem = ({ item, index }) => {
        return <PictureCard item={item} horizontal={true} />;
    };


    useEffect(() => {
        const recentlyPosted = async () => {
            try {
                const res = await httpClient.get("/picture/recentlyPosted");
                console.log(res.data);
                let projectsObtained = res.data??[];
                setProjectList({...projectsObtained, loading: false});
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
                }
            }

            recentlyPosted();
        
        }, []);

    return (<Box marginX="5"
        borderRadius="md"
        marginY="5"
        borderWidth={"1"}
        borderColor={colors.SECUNDARY6}
        background={colors.SECUNDARY23}
        alignItems="center"
    >
            <Text fontSize={"xl"} color={colors.SECUNDARY5} fontWeight={"semibold"} >Imagenes más recientes</Text>

        <Divider />
        <Carousel
            ref={carouselRef}
            data={projectList.data}
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
                <Text width={"100%"} display={"flex"} textAlign={"center"}>Aún no hay Imagenes...</Text>
            </Box>}
            onSnapToItem={(index) =>
                setPaginationState({
                    ...paginationState,
                    ["activeSlide"]: index,
                })
            }
        />

            <TouchableOpacity
                onPress={() => navigation.navigate("news")}
                style={{
                    backgroundColor: colors.PRIMARY1,
                    borderRadius: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 2
                }}>
                <Text fontSize="md" fontWeight="semibold" color={colors.SECUNDARY1}>Ver más</Text> 
            </TouchableOpacity>
    </Box>)
}
export default LastPictures