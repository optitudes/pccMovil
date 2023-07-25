// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState,useContext, useEffect } from 'react';
import {  Icon } from "react-native-elements";
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
import ProjectCard from '../../../components/ProjectCard';
import httpClient from '../../../config/httpClient';
import colors from '../../../constants/colors';
import LoadingSpinner from '../../../components/LoadingSpinner';
import authContext from '../../../context/authContext';
import ImageCropPicker from 'react-native-image-crop-picker';
import { isNotStringEmpty } from "../../../utils/helpers";
import ImagePicker from 'react-native-image-picker';


const ProjectForm = ({ route }) => {
    const { action, projectId } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState('');

    useEffect(() => {
        if(projectId != -1){
            updateProject();
        }
      }, []);

     //metoo que obtiene los proyectos con la palabra
    const updateProject = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/project/get/"+projectId);
                let projectObtained = res.data.data;
                setBanner(projectObtained.banner);
                setName(projectObtained.name);
                setDescription(projectObtained.description)
                setIsLoading(false);
            } catch (error) {
                Toast.show({
                  type:"error",
                  text1: "Error!",
                  text2: error.message ,
                  autoHide: false,

                });
            }};
   
    //metodo para validar el nombre
    const handleNameChange = (text) => {
        setName(text);
      };
    //metodo para validar la descripcion
      const handleDescriptionChange = (text) => {
        setDescription(text);
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
                text2: 'Error al seleccionar la imagen'
              });
            });
      };

      //metodo para hacer validaciones  y el submit
      const handleSubmit = async() => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario
        // Por ejemplo, puedes realizar una llamada a una API para guardar la información en un servidor.
        // Crear un nuevo objeto FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('id', projectId);

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
        const res = await httpClient.post("/project/"+action, formData, {
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
                {banner !== '' && <Image source={{ uri: banner }} style={styles.image} />}
                <TouchableOpacity style={styles.button} onPress={handleBannerChange}>
                  <Text style={styles.buttonText}>Seleccionar Banner</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del proyecto"
                  value={name}
                  onChangeText={handleNameChange}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Descripción del proyecto"
                  multiline
                  numberOfLines={5}
                  value={description}
                  onChangeText={handleDescriptionChange}
                />
            </View>
            
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
  
  });
export default ProjectForm;