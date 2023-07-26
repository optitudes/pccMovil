import {Text, } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';

import {  Icon } from "react-native-elements";
import colors from '../../../constants/colors';

import authContext from '../../../context/authContext';
import Toast from 'react-native-toast-message';

const VideoDetail = ({route, navigation }) => {
    const idVideo = route.params.idVideo??-1;
    const [isLoading, setIsLoading] = useState(false);
    const { authenticated, userInfo} = useContext(authContext);

    const [linkVideo,setLinkVideo] = useState('');
    const [titleVideo,setTitleVideo] = useState('');
    const [descVideo,setDescVideo] = useState('');


    useEffect(() => {
          updateVideo();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updateVideo = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/video/get/"+idVideo);
                let videosObtained = res.data.data;
                setLinkVideo(videosObtained.link);
                setTitleVideo(videosObtained.title);
                setDescVideo(videosObtained.description)
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
            } finally {
              setIsLoading(false)
            }
    };

    const deleteVideo = async () => {
      const formData = new FormData();
      formData.append('id', idProject);

      try {

      setIsLoading(true);
      const res = await httpClient.post("/video/remove", formData, {
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
             <View style={styles.wrapper}>
                <View style={styles.videoContainer}>
                  {/* Video de YouTube */}
                  <YoutubePlayer
                    height={300}
                    play={false}
                    videoId={linkVideo}
                  />
                </View>
                <Text style={styles.title}>{titleVideo} </Text>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.textContainer}>
                    {/* Título */}
          
                    {/* Descripción */}
                    <Text style={styles.description}>{descVideo}</Text>
                  </View>
                </ScrollView>
            </View>
          <TouchableOpacity style={styles.floatingRightButton} onPress={() => navigation.navigate("videoForm",{action:"edit",videoId:idVideo})}>
              <Icon
              name={"pencil-box"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingLeftButton} onPress={deleteVideo}>
              <Icon
              name={"delete-outline"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
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
    videoContainer: {
      height: 230, // Altura fija del video
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
export default VideoDetail;