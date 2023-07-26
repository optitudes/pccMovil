// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState,useContext, useEffect } from 'react';
import {  Icon } from "react-native-elements";
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
    Image,
    TouchableOpacity,
 Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import httpClient from '../../../config/httpClient';
import colors from '../../../constants/colors';
import LoadingSpinner from '../../../components/LoadingSpinner';
import authContext from '../../../context/authContext';
import ImageCropPicker from 'react-native-image-crop-picker';
import { isNotStringEmpty } from "../../../utils/helpers";


const VideoForm = ({ route }) => {
    const { action, videoId } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const [banner, setBanner] = useState('');
    const [linkVideo,setLinkVideo] = useState('');
    const [titleVideo,setTitleVideo] = useState('');
    const [descVideo,setDescVideo] = useState('');
    const [projectNames,setProjectNames] = useState(['']);
    const [projectNameSelected, setProjectNameSelected] = useState('');

    useEffect(() => {
        if(videoId != -1){
            updateVideo();
        }
        updateProjectNames();
      }, []);

     //metoo que obtiene todos los datos de un video 
    const updateVideo = async () => {
            
        try {
            setIsLoading(true);
            const res = await httpClient.get("/video/get/"+videoId);
            let videoObtained = res.data.data;
            setLinkVideo(videoObtained.link);
            setTitleVideo(videoObtained.title);
            setDescVideo(videoObtained.description);
            setBanner(videoObtained.banner);
            console.log(videoObtained);
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
 //metoo que obtiene todos los datos de un video 
    const updateProjectNames = async () => {
            
        try {
            setIsLoading(true);
            const res = await httpClient.get("/project/getNames");
            setProjectNames(res.data.data);
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

    //metodo para validar el titulo del video 
    const handleTitleChange = (text) => {
        setTitleVideo(text);
      };
    //metodo para validar la descripcion
      const handleDescriptionChange = (text) => {
        setDescVideo(text);
      };
    //metodo para validar el link del video 
      const handleLinkChange = (text) => {
        setLinkVideo(text);
      };
    //metodo para manejar el cambio de banner y sus validaciones
      const handleBannerChange = (imageUrl) => {
        ImageCropPicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            cropperCircleOverlay: false,
            compressImageMaxWidth: 800,
            compressImageMaxHeight: 800,
            compressImageQuality: 0.7,
          })
            .then((image) => {
              if (!image.cancelled) {
                setBanner(image.path);
              }
            })
            .catch((error) => {
              Toast.show({
                type:"error",
                text1: "Error!",
                text2: error.message
              });
            });
      };

      //metodo para hacer validaciones  y el submit
      const handleSubmit = async() => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario
        // Por ejemplo, puedes realizar una llamada a una API para guardar la información en un servidor.
        // Crear un nuevo objeto FormData
        const formData = new FormData();
        formData.append('title', titleVideo);
        formData.append('description', descVideo);
        formData.append('id', videoId);
        formData.append('link', linkVideo);
        formData.append('projectName', projectNameSelected);


        // Asegúrate de que se haya seleccionado una imagen antes de agregarla al FormData
        if (banner !== '') {
        formData.append('banner', {
            uri: banner,
            type: 'image/jpeg', // Asegúrate de proporcionar el tipo correcto de la imagen
            name: 'banner.jpg', // El nombre que quieras asignar a la imagen en el servidor
        });
        }

        try {

        setIsLoading(true);
        const res = await httpClient.post("/video/"+action, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        // Realizar cualquier acción necesaria con la respuesta del servidor
        if(res.data.success){
          Toast.show({
            type:"success",
            text1: "Éxito!",
            text2: res.data.message,
                  autoHide: false,
                  style: styles.toastStyle, // Aplicamos el estilo personalizado
          });
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
          text2: "Nombre no disponible o usuario no autenticado",
                  autoHide: false,
                  style: styles.toastStyle, // Aplicamos el estilo personalizado
        });
        // Manejar errores si es necesario
        }
        setIsLoading(false);
      };


return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
          <LoadingSpinner isVisible={isLoading} text="Cargando..." />
          <ScrollView>
            <View style={styles.imageContainer}>
                {banner !== null && banner !== '' && <Image source={{ uri: banner }} style={styles.image} />}
                <TouchableOpacity style={styles.button} onPress={handleBannerChange}>
                  <Text style={styles.buttonText}>Seleccionar Banner</Text>
                </TouchableOpacity>
            </View>
            {linkVideo!== '' && 
                <View style={styles.videoContainer}>
                        {/* Video de YouTube */}
                        <YoutubePlayer
                            height={300}
                            play={false}
                            videoId={linkVideo}
                        />
                </View>
                }
                <TextInput
                  style={styles.input}
                  placeholder="Id del video de youtube"
                  value={linkVideo}
                  onChangeText={handleLinkChange}
                />
            <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Titulo del video"
                  value={titleVideo}
                  onChangeText={handleTitleChange}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del video"
                  multiline
                  numberOfLines={5}
                  value={descVideo}
                  onChangeText={handleDescriptionChange}
                />
            </View>
            {action=='create'  && (
                <>
              <View style={styles.dropbox}>
                  <Text>Selecciona un proyecto:</Text>
                  <Picker
                      selectedValue={projectNameSelected??''}
                      style={{ height: 50, width: 200 }}
                      onValueChange={(itemValue, itemIndex) => setProjectNameSelected(itemValue)}
                  >
                      {projectNames.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                      ))}
                  </Picker>
                  <Text>Seleccionaste: {projectNameSelected}</Text>
              </View>
              </>
              )}
            
            <Button title={action=="create"?"Crear":"Editar"} onPress={handleSubmit} />
          </ScrollView>
          </View>    
          <Toast />
        </SafeAreaView>);

}
const styles = StyleSheet.create({
    imageContainer:{
      paddingVertical: 10,       // Padding hacia abajo
      alignItems: 'center',      // Centrar los elementos horizontalmente
      justifyContent: 'center',  // Centrar los elementos verticalmente
      marginBottom: 20,    
    },
    container: {
        padding: 16,
      },
      input: {
        borderWidth: 1,
        borderColor: colors.SECUNDARY4,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
      },
    image: {
        borderWidth: 1,             // Ancho del borde
        borderColor: colors.PRIMARY1,
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
      },
      button: {
        backgroundColor: colors.CUATERNARY1,
        borderRadius: 20, // Ajusta el valor para controlar la curvatura de los bordes
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      buttonText: {
        color: colors.SECUNDARY1,
        fontSize: 16,
      },
      textContainer:{
        width: '100%',


      },
      toastStyle: {
        // Estilo para el Toast
        zIndex: 9999, // Asegura que el Toast esté por encima de otros elementos
      },
      videoContainer: {
        height: 230, // Altura fija del video
      },
      dropbox:{
        paddingVertical: 10,       // Padding hacia abajo
        alignItems: 'center',      // Centrar los elementos horizontalmente
        justifyContent: 'center',  // Centrar los elementos verticalmente
        marginBottom: 20,
      }
  
  });
export default VideoForm;