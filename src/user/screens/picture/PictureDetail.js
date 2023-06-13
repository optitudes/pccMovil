import {Text} from 'native-base';
import React, {  useState, useEffect } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import ImageView from '../../../components/ImageView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';

import colors from '../../../constants/colors';
const PictureDetail = ({route, navigation }) => {
    const idPicture = route.params.idPicture??-1;
    const [isLoading, setIsLoading] = useState(false);

    const [linkPicture,setLinkPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif');
    const [titlePicture,setTitlePicture] = useState('');
    const [descPicture,setDescPicture] = useState('');


    useEffect(() => {
          updatePicture();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updatePicture = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/picture/get/"+idPicture);
                let pictureObtained = res.data.data;
                setLinkPicture(pictureObtained.link);
                setTitlePicture(pictureObtained.title);
                setDescPicture(pictureObtained.description)
                console.log(pictureObtained)
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
            } finally {
              setIsLoading(false)
            }
    };

    return (
        <SafeAreaView style={styles.container}>
          <LoadingSpinner isVisible={isLoading} text="Cargando..." />
             <View style={styles.wrapper}>
        <View style={styles.pictureContainer}>
          {/* Picture  */}
            <ImageView imageUrl={linkPicture}/> 
        </View>
  
            <Text style={styles.title}>{titlePicture} </Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.textContainer}>
            {/* Título */}
  
            {/* Descripción */}
            <Text style={styles.description}>{descPicture}</Text>
          </View>
        </ScrollView>
</View>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 16, // Margen general de los bordes
    },
    wrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.PRIMARY1,
        borderRadius: 10,
        padding: 8,
      },
    pictureContainer: {
      height: 230, // Altura fija del Picture
    },
    scrollView: {
      flex: 1,
    },
    textContainer: {
      padding: 10, // Espacio interno del contenedor de texto
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center', // Centrar el texto del título
      color: colors.PRIMARY1,
      marginBottom: 16, // Margen inferior del título
    },
    description: {
      fontSize: 16,
      textAlign: 'center', // Centrar el texto de la descripción
    },
  });
export default PictureDetail;