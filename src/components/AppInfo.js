import { useNavigation } from '@react-navigation/core';
import { Box, Text, HStack, Divider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';
import AppInfoCard from './AppInfoCard';




import colors from '../constants/colors';


const AppInfo = (props) => {

    const carouselRef = React.createRef();
    const [infoList, setInfoList] = useState([]);
    const [paginationState, setPaginationState] = useState({
        entries: 1,
        activeSlide: 0,
    });

    const renderItem = ({ item, index }) => {
        return <AppInfoCard  item={item} />;
    };


    useEffect(() => {
        const updateAppInfo = async () => {
            try {
                let info = [];
                info.push({title:"",content:"El paisaje cultural, conjuga elementos naturales, económicos y sociales, que se expresan en una región con un alto grado de homogeneidad y que se constituyó como un caso excepcional en el mundo. Esto aunado a la fortaleza de la tradición cultural y generacional en torno al cultivo de café de alta montaña, en la cordillera Central de los Andes en Colombia y a las características propias de procesos históricos de habitar y construir un Paisaje, alrededor de este cultivo."})
                info.push({title:"",content:"El Paisaje Cultural Cafetero como patrimonio de la humanidad se teje desde el año 2001. Sustentados en la construcción de una identidad cultural e institucional alrededor del cultivo del café. El cual ha construido una gastronomía, una arquitectura, unos saberes, una música y una institucionalidad particular en el marco de un entorno biodiverso, entre otros. "})
                info.push({title:"Valores del PCC",content:"i)	Esfuerzo humano, familiar, generacional e histórico para la producción de un café de excelente calidad, en el marco de un desarrollo sostenible.\nii)	Cultura cafetera para el mundo.\niii)	Capital social estratégico construido alrededor de una institucionalidad.iv)	Relación entre tradición y tecnología para garantizar la calidad y sostenibilidad del producto."})
                info.push({title:"El esfuerzo humano",content:"El primer valor tiene que ver con el Esfuerzo humano, familiar, generacional e histórico para el reconocimiento de un modo de producción de café sostenible. La condición de sostenibilidad de dicha producción radica:  conservación del suelo, desyerbado selectivo, niveles de sombrío, la falta de mecanización, la selección manual del grano en pequeñas parcelas en las que participan en su trabajo el núcleo familiar y mano de obra externa a las fincas (Ministerio de Cultura , 2011, págs. 28-30)."})
                info.push({title:"La cultura cafetera",content:"El segundo valor, la cultura cafetera tiene que ver con la identidad que se construye en relación con valores como: el pragmatismo, la laboriosidad, el emprendimiento, la aventura y la sagacidad para los negocios, el amor al trabajo, los fuertes lazos familiares, la colonización de espacios y una marcada tendencia religiosa de carácter católica. Esto terminó consolidando espacios y formas identitarias tales como: personajes típicos como los arrieros, las chapoleras, la mula, el hacha, el machete, mitos y leyendas, saberes culinarios, sitios tradicionales,fiestas, artesanías, vestuarios, música, pintura y viviendas (Ministerio de Cultura , 2011, págs. 30-38)."})
                info.push({title:"Capital social",content:"El tercer valor capital social estratégico construido alrededor de la institucionalidad, tiene que ver con la configuración de la Federación Nacional de Cafeteros. La cual ha propiciado la sostenibilidad del PCC y la producción de café en tanto por medio de la creatividad, la investigación, la cooperación, el acceso a mercados internacionales, el almacenamiento, la asistencia técnica, la consolidación de cooperativas cafeteras, la presencia directa en los territorios y la garantía de la compra de cosechas. Todas estas acciones, han aportado a la competitividad de la caficultura cafetera colombiana (Ministerio de Cultura , 2011, págs. 39-40)."})
                info.push({title:"Relación entre tradición y tecnología",content:"El cuarto valor relación entre tradición y tecnología para garantizar la calidad y sostenibilidad del producto, buscando un equilibrio entre producción y conservación ecológica. Esto en temas relacionados con: el aumento en los costos de producción, las plagas, el descenso de la productividad, el cambio climático, el relevo generacional, la perdida cultural y los saberes ancestrales, el turismo y la fluctuación de los precios de comercio del café. (Ministerio de Cultura , 2011, págs. 42-43)."})
                info.push({title:"EL PCC es protección:",content:"Esta declaración tiene por objetivo proteger las dinámicas que se desarrollan en torno a la producción cafetera, el paisaje en el que se inscribe y la cultura que allí se desarrolla.",list:["Café de montaña","Cultivo café en ladera","Edad de la caficultura","Institucionalidad cafetera","Estructura de pequeña propiedad cafetera","Cultivos múltiples","tecnologías y formas de producción sostenibles en la cadena productiva del café"]})
                info.push({title:"Construye una Identidad",content:"Hace parte de una tradición trasmitida por generaciones y que ha construido elementos culturales comunes para quienes habitan y habitaron la zona, con un reconocimiento sociocultural.",list:["Tradición","Patrimonio arquitectónico","Patrimonio urbanístico","Patrimonio arqueológico","Patrimonio natural","Historia de la producción de café"]})
                info.push({title:"Cultura",content:"La conservación y recreación de actores y elementos culturales propios del PCC, que perduran y se transmiten en el tiempo y generan elementos identitarios de reconocimiento y autoreconocimeinto. Actores:",list:["Chapolera (recolectora de café)","Barbero","Yerbatero (vendedor de plantas medici­nales)","Sobandero (terapeuta muscular empírico)","Coplero (compositor poético)","Trovador (intérprete poético)"]})
                info.push({title:"Cultura",list:["Arriero (campesino que transporta mercancías en caballo y mula)","Culebrero (vendedor callejero con verborragia inusual)","Revueltero (vendedor informal de frutas y verduras)","Carretillero (conductor de vehículo de tracción animal)"]})
                info.push({title:"Elementos Culturales",list:["Viviendas de bahareque (mezcla de tierra húmeda, madera y fibras naturales)","El Jeep Willys, vehículo","La gastronomía: bandeja, paisa, el sancocho, el fiambre y la trucha con patacón","Festividades: El Reinado Nacional del Café, El Encuentro Nacional de Escritores Luis Vidales, desfiles de Yipao, el Cuyabrito de oro.","Artesanía: bejuco, muñequería en trapo, íraca, joyería Quimbaya y en semillas."]})
                info.push({title:"Elementos Culturales",list:["Mitos: la Leyenda del Cacique Calarcá y la del Río La Vieja","Bailes el juego de los macheteros","Música de cuerda, seguida de guitarra y tiple y por último el bambuco","Artefactos:  machete, hacha, molino, canasto, ariete, azadón, media luna,  guadaña, peladora, despulpadora"]})
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
        borderColor={colors.PRIMARY2}
        background={colors.SECUNDARY23}
        alignItems="center"
    >
                    <Text fontSize={"xl"} color={colors.PRIMARY1} fontWeight={"semibold"} >¿Qué es el Paisaje Cultural Cafetero?</Text>
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
export default AppInfo