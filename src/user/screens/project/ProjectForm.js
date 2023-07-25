// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState,useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {  Icon } from "react-native-elements";
import Toast from 'react-native-toast-message';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
    Image,
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
            cleanFields();
            updateProject();
        }else{
            cleanFields();
            console.log("project not found ");
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
                console.log(projectObtained)
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
            }};
   
    const cleanFields = () => {
        console.log("cleaning fields");
    }


    const handleNameChange = (text) => {
        setName(text);
      };
    
      const handleDescriptionChange = (text) => {
        setDescription(text);
      };
    
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
      /*
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
          <Text>{action}</Text>
          <Text>{projectId}</Text>

          </View>
        </SafeAreaView>
      );
      */

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
            text2: res.data.message
          });
        }else{
          Toast.show({
            type:"error",
            text1: "Error!",
            text2: res.data.message
          });
        }
        } catch (error) {
        Toast.show({
          type:"error",
          text1: "Error!",
          text2: "El nombre del proyecto no se encuentra disponible"
        });
        // Manejar errores si es necesario
        }
      };


return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
          <Toast />
          {banner !== '' && <Image source={{ uri: banner }} style={styles.image} />}
          <Button style={styles.bannerButtom} title="Seleccionar banner del proyecto" onPress={handleBannerChange} />
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
            
          
          <Button title={action=="create"?"Crear":"Editar"} onPress={handleSubmit} />
          </View>    
        </SafeAreaView>);

}
const styles = StyleSheet.create({
    container: {
        padding: 16,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
      },
      bannerButtom: {

      }
  
  });
export default ProjectForm;