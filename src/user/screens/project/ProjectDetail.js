import {Text} from 'native-base';
import React, {  useState, useEffect, useContext } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import ImageView from '../../../components/ImageView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';
import {  Icon } from "react-native-elements";

import LastVideos from '../../../components/LastVideos';
import LastPictures from '../../../components/LastPictures';
import LastPodcast from '../../../components/LastPodcast';
import colors from '../../../constants/colors';

import authContext from '../../../context/authContext';
import Toast from 'react-native-toast-message';

const ProjectDetail = ({route, navigation }) => {
    const idProject = route.params.idProject??-1;
    const [isLoading, setIsLoading] = useState(false);
    const { authenticated, userInfo} = useContext(authContext);

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
            } catch (error) {
                Toast.show({
                  type:"error",
                  text1: "Error!",
                  text2: error.message,
                          autoHide: false,
                          style: styles.toastStyle, // Aplicamos el estilo personalizado
                });
            } finally {
              setIsLoading(false)
            }
    };
    const deleteProject = async () => {
        const formData = new FormData();
        formData.append('id', idProject);

        try {

        setIsLoading(true);
        const res = await httpClient.post("/project/remove", formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
      });

        // Realizar cualquier acción necesaria con la respuesta del servidor
        if(res.data.success){
          navigation.reset({
            index: 0, // Establecer el índice del historial en 0 (primera pantalla)
            routes: [{ name: "start" }], // Definir la nueva vista como la primera
          });
          //navigation.popToTop();
        }else{
          Toast.show({
            type:"error",
            text1: "Error!",
            text2: res.data.message,
                  autoHide: false,
                  style: styles.toastStyle, // Aplicamos el estilo personalizado
          });
        }
        } catch (error) {
        Toast.show({
          type:"error",
          text1: "Error!",
          text2: error.message,
                  autoHide: false,
                  style: styles.toastStyle, // Aplicamos el estilo personalizado
        });
        // Manejar errores si es necesario
        }
        setIsLoading(false);
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

            {authenticated && userInfo.userType.levelAccess == 0  && (
              <>
          <TouchableOpacity style={styles.floatingRightButton} onPress={() => navigation.navigate("projectForm",{action:"edit",projectId:idProject})}>
              <Icon
              name={"pencil-box"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingLeftButton} onPress={deleteProject}>
              <Icon
              name={"delete-outline"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
          </>
          )}

          <Toast />
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
    floatingRightButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: colors.QUINARY1,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingLeftButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: colors.REPROVED1,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
export default ProjectDetail;