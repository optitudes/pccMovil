import {Text, } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';
import ImageView from '../../../components/ImageView';

import colors from '../../../constants/colors';
const PodcastDetail = ({route, navigation }) => {
    const idPodcast = route.params.idPodcast??-1;
    const [isLoading, setIsLoading] = useState(false);

    const [linkPodcast,setLinkPodcast] = useState('');
    const [titlePodcast,setTitlePodcast] = useState('');
    const [descPodcast,setDescPodcast] = useState('');
    const [bannerPodcast,setBannerPodcasts] = useState('');


    useEffect(() => {
          updatePodcast();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updatePodcast = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/podcast/get/"+idPodcast);
                let podcastsObtained = res.data.data;
                setLinkPodcast(podcastsObtained.link);
                setTitlePodcast(podcastsObtained.title);
                setDescPodcast(podcastsObtained.description);
                setBannerPodcasts(podcastsObtained.banner);
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
        <View style={styles.podcastContainer}>
          {/* podcast de YouTube */}

          <ImageView imageUrl={bannerPodcast}/> 
          <YoutubePlayer
            height={0}
            play={true}
            videoId={linkPodcast}
          />
        </View>
  
            <Text style={styles.title}>{titlePodcast} </Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.textContainer}>
            {/* Título */}
  
            {/* Descripción */}
            <Text style={styles.description}>{descPodcast}</Text>
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
    podcastContainer: {
      height: 230, // Altura fija del podcast
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
export default PodcastDetail;