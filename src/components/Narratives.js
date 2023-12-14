import { useNavigation } from '@react-navigation/core';
import { Box, Text, HStack, Divider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';
import NarrativeCard from './NarrativeCard';




import colors from '../constants/colors';


const Narratives = (props) => {

    const carouselRef = React.createRef();
    const [infoList, setInfoList] = useState([]);
    const [paginationState, setPaginationState] = useState({
        entries: 1,
        activeSlide: 0,
    });

    const renderItem = ({ item, index }) => {
        return <NarrativeCard  item={item} />;
    };


    useEffect(() => {
        const updateAppInfo = async () => {
            try {
                let info = [];
                info.push({title:"Narrativa: 3.TS.3. (2022)",content:"Paisaje cultural cafetero, es el desarrollo de una cultura desde unos pilares identitarios claros que giran en torno al café, su producción y como las personas crecen y se desenvuelven en estos ambientes, creando un patrimonio con una riqueza histórica, natural, cultural, única de la región cafetera de Colombia como es el Quindío, y se considera único por la ubicación geográfica, su clima, y toda la cultura que se construyó en esta zona."})
                info.push({title:"LCNYEA 2: (2022)",content:"A mi se me viene a la mente por paisaje cultural cafetero a los paisajes que caracterizan a la zona cafetera, paisajes que son únicos. Montañas, clima templado, grandes sectores con plantas de café, de plátano, entre otras. Yo creo que el paisaje cafetero se caracteriza por su verde, por sus montañas verdes, por los terrenos llenos de plantas de café, por el café."})
                info.push({title:"CSP.3 (2022)",content:"La geografía de los pueblos, su economía también va los conocimientos, los saberes generacionales, los icónicos del trabajador cafetero, el turismo desmedido, las artesanías alrededor del café."})
                info.push({title:"",content:"CSP.1 (2022): [PCC es] todo lo que se encuentra en el entorno y está relacionado con la producción de café en el país. Las fincas cafeteras, las montañas, las casas clásicas, los costales de café, las vestimentas. [PCC] se construyó a través del tiempo, nos da una identidad [y] nos ayudó a construir tradiciones."})
                info.push({title:"",content:"LLLC.8 (2022). Willis, traje de la chapolera, el pocillo de café de juan Valdés, bultos de café, las montañas verdes, hermosos atardeceres, las fincas cafeteras, las plantas de plátano y las de café que se ven por la carretera y la amabilidad de toda la gente de la zona cafetera. Características, la tradición que evoca las costumbres de resistencia y verraquera de la región cafetera."})
                info.push({title:"",content:"LLLC.16 (2022). Para la formación profesional, considero que es importante puesto que, al vivir y convivir con el espacio se requiere de esta formación y no estar 'descontextualizado' o tener ignorancia respecto a este territorio. Al ejercer mi profesión, debo situar mi contexto en un espacio específico."})

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
        borderColor={colors.AUX1}
        background={colors.SECUNDARY23}
        alignItems="center"
    >
            <Text fontSize={"xl"} color={colors.AUX1} fontWeight={"semibold"} >Narrativas de los estudiantes</Text>
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
export default Narratives