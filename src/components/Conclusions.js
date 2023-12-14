import { useNavigation } from '@react-navigation/core';
import { Box, Text, HStack, Divider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';
import ConclusionCard from './ConclusionCard';




import colors from '../constants/colors';


const Conclusions = (props) => {

    const carouselRef = React.createRef();
    const [infoList, setInfoList] = useState([]);
    const [paginationState, setPaginationState] = useState({
        entries: 1,
        activeSlide: 0,
    });

    const renderItem = ({ item, index }) => {
        return <ConclusionCard  item={item} />;
    };


    useEffect(() => {
        const updateAppInfo = async () => {
            try {
                let info = [];
                info.push({title:"",content:"El nivel de apropiación del Paisaje Cultural cafetero es muy sencillo y no da cuenta de elaboraciones muy complejas acerca del mismo, sin embargo, es claro que al menos los elementos esenciales en cuanto a espacio, paisaje y cultura están presentes de manera constante. "})
                info.push({title:"",content:"Quienes lograron en sus narrativas y encuestas un análisis más profundo del PCC, llegan a elaboraciones críticas sobre el mismo y se acercan a proposiciones y posiciones que elaboran miradas reflexivas sobre la situación actual de su patrimonio, territorio y paisaje cultural."})
                info.push({title:"",content:"La aplicación del Paisaje Cultural Cafetero representa una valiosa herramienta para difundir la riqueza cultural y natural de la región. Al mostrar los resultados de la investigación y proporcionar una experiencia intuitiva, la aplicación se posiciona como un recurso útil para quienes deseen explorar y conocer más sobre el PCC."})
                
                setInfoList(info);
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
                }
            }

            updateAppInfo();
        
        }, []);

    return (<Box marginX="5"
        borderRadius="md"
        marginY="5"
        borderWidth={"1"}
        borderColor={colors.AUX2}
        background={colors.SECUNDARY23}
        alignItems="center"
    >
            <Text fontSize={"xl"} color={colors.AUX2} fontWeight={"semibold"} >Conclusiones</Text>
        <Carousel
            ref={carouselRef}
            data={infoList}
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
                <Text width={"100%"} display={"flex"} textAlign={"center"}>Cargando información</Text>
            </Box>}
            onSnapToItem={(index) =>
                setPaginationState({
                    ...paginationState,
                    ["activeSlide"]: index,
                })
            }
        />
    </Box>)
}
export default Conclusions