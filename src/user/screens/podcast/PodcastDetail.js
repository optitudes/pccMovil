import {Text, } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet,Button } from "react-native";
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';
import Sound from 'react-native-sound';
import ImageView from '../../../components/ImageView';
import {  Icon } from "react-native-elements";
import authContext from '../../../context/authContext';

import colors from '../../../constants/colors';
const PodcastDetail = ({route, navigation }) => {
    const { authenticated, userInfo} = useContext(authContext);
    const idPodcast = route.params.idPodcast??-1;
    const [isLoading, setIsLoading] = useState(false);

    const [linkPodcast,setLinkPodcast] = useState('');
    const [titlePodcast,setTitlePodcast] = useState('');
    const [descPodcast,setDescPodcast] = useState('');
    const [bannerPodcast,setBannerPodcasts] = useState('');

    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

  const updateSound = (linkSound) => {
      // Load the audio file when the component mounts
    setSound( new Sound(
      linkSound,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading the sound: ', error);
        }
      }
    ));

  }
  const playSound = () => {
    console.log('trying to play the song');
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound failed to play');
        }
      });
      setIsPlaying(true);
    }
    console.log(sound);
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
      setIsPlaying(false);
    }
  };
  const deletePodcast = () => {
    console.log("podcast borrado");
  }

    useEffect(() => {
          updatePodcast();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updatePodcast = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/podcast/get/"+idPodcast);
                let podcastsObtained = res.data.data;
                updateSound(podcastsObtained.link);
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
              <ImageView imageUrl={bannerPodcast}/> 
            </View>
            <Text style={styles.title}>{titlePodcast} </Text>
            <ScrollView style={styles.scrollView}>
              <View style={styles.textContainer}>
                <Text style={styles.description}>{descPodcast}</Text>
              </View>
              {isPlaying ? (
                <View style={styles.centerContainer}>
                  <TouchableOpacity style={styles.stopButton} onPress={stopSound}>
                  <Icon
                    name={"stop"}
                    color={colors.REPROVED1}
                    size={24}
                    type="material-community"
                  />
                </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.centerContainer}>
                  <TouchableOpacity style={styles.playButton} onPress={playSound}>
                  <Icon
                  name={"play"}
                  color={colors.PRIMARY1}
                  size={24}
                  type="material-community"
                />
              </TouchableOpacity>
              </View>
              )}
           </ScrollView>
            <>
            <TouchableOpacity style={styles.floatingRightButton} onPress={() => navigation.navigate("podcastForm",{action:"edit",podcastId:idPodcast})}>
              <Icon
              name={"pencil-box"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingLeftButton} onPress={deletePodcast}>
              <Icon
              name={"delete-outline"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
         </>
        </View>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton:{
        borderRadius: 60,
        backgroundColor: colors.SECUNDARY3,
        padding: 8,
    },
    stopButton:{
        borderRadius: 60,
        backgroundColor: colors.SECUNDARY3,
        padding: 8,

    },
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