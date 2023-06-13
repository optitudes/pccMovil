import {Text} from 'native-base';
import React, {  useState, useEffect } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import ImageView from '../../../components/ImageView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';

import LastVideos from '../../../components/LastVideos';
import LastPictures from '../../../components/LastPictures';
import LastPodcast from '../../../components/LastPodcast';
import colors from '../../../constants/colors';

const ProjectDetail = ({route, navigation }) => {
    const idProject = route.params.idProject??-1;
    const [isLoading, setIsLoading] = useState(false);

    const [bannerProject,setBannerProject] = useState('https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif');
    const [nameProject,setNameProject] = useState('');
    const [descProject,setDescProject] = useState('');


    useEffect(() => {
          updateProject();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updateProject = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/project/get/"+idProject);
                let projectObtained = res.data.data;
                setBannerProject(projectObtained.banner);
                setNameProject(projectObtained.name);
                setDescProject(projectObtained.description)
                console.log(projectObtained)
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


        <ScrollView style={styles.scrollView}>
        <View style={styles.projectContainer}>
          {/* project  */}
            <ImageView imageUrl={bannerProject}/> 
        </View>
  
            <Text style={styles.title}>{nameProject} </Text>
          <View style={styles.textContainer}>
            {/* Título */}
  
            {/* Descripción */}
            <Text style={styles.description}>{descProject}</Text>

            <LastVideos sourceUrl={"getByProject/" + idProject} title="Videos"/>
            <LastPictures sourceUrl={"getByProject/" + idProject} title="Imagenes" />
            <LastPodcast sourceUrl={"getByProject/" + idProject} title="Podcasts"/>

          </View>
        </ScrollView>
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
    projectContainer: {
      height: 230, // Altura fija del project
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
export default ProjectDetail;