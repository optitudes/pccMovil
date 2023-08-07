// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState,useContext, useEffect } from 'react';
import Toast from 'react-native-toast-message';
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
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';


const PodcastForm = ({ route }) => {
    const { action, podcastId } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const [linkPodcast,setLinkPodcast] = useState('');
    const [titlePodcast,setTitlePodcast] = useState('');
    const [descPodcast,setDescPodcast] = useState('');


    const [banner, setBanner] = useState('');
    const [soundName,setSoundName] = useState('');
    const [podcast,setPodcast] = useState(null);

    const [projectNames,setProjectNames] = useState(['']);
    const [projectNameSelected, setProjectNameSelected] = useState('');

    useEffect(() => {
        if(podcastId != -1){
            updatePodcast();
        }
        updateProjectNames();
      }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
      });

      console.log(
        "Selected file:",
        result.uri,
        result.type, // MIME type
        result.name,
        result.size
      );

      setPodcast(result);
      setSoundName(result.name);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };
  //metoo que obtiene los proyectos con la palabra
  const updatePodcast = async () => {
          
          try {
              setIsLoading(true);
              const res = await httpClient.get("/podcast/get/"+idPodcast);
              let podcastsObtained = res.data.data;
              setLinkPodcast(podcastsObtained.link);
              setTitlePodcast(podcastsObtained.title);
              setDescPodcast(podcastsObtained.description);
              setBanner(podcastsObtained.banner);
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
        setTitlePodcast(text);
      };
    //metodo para validar la descripcion
      const handleDescriptionChange = (text) => {
        setDescPodcast(text);
      };
    //metodo para validar el link del video 
      const handleLinkChange = (text) => {
        setLinkPodcast(text);
        //updateSound(text);
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
        formData.append('title', titlePodcast);
        formData.append('description', descPodcast);
        formData.append('id', podcastId);
        formData.append('projectName', projectNameSelected);


        if (podcast !== null) {

          const fileUri = podcast.uri;
          const localFilePath =  `${RNFS.ExternalDirectoryPath}/Pictures/${podcast.name}`;

          await RNFS.copyFile(fileUri, localFilePath);
          formData.append('podcast', {
            uri: `file://${localFilePath}`,
            type: podcast.type,
            name: podcast.name,
          });
        }
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
        const res = await httpClient.post("/podcast/create",formData , {
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
          text2:  error.message,
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
            <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.button} onPress={pickDocument}>
                  <Text style={styles.buttonText}>Seleccionar podcast(mp3)</Text>
            </TouchableOpacity>
            </View>
            {soundName !== '' && (
                <View style={styles.centerContainer}>
                    <Text style={styles.info}>Nombre del audio seleccionado: {soundName}</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Titulo del podcast"
                  value={titlePodcast}
                  onChangeText={handleTitleChange}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del podcast"
                  multiline
                  numberOfLines={5}
                  value={descPodcast}
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
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    info:{
        borderRadius: 60,
      paddingVertical: 10,       // Padding hacia abajo
    },
    
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
export default PodcastForm;