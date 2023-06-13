import {Text, } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';

import colors from '../../../constants/colors';
const VideoDetail = ({route, navigation }) => {
    const idVideo = route.params.idVideo??-1;
    const [isLoading, setIsLoading] = useState(false);

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
  });
export default VideoDetail;