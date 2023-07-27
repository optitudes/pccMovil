import {Text} from 'native-base';
import React, {  useState, useEffect,useContext } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import ImageView from '../../../components/ImageView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';
import Toast from 'react-native-toast-message';
import {  Icon } from "react-native-elements";
import colors from '../../../constants/colors';
import authContext from '../../../context/authContext';
const PictureDetail = ({route, navigation }) => {
    const { authenticated, userInfo} = useContext(authContext);

    const idPicture = route.params.idPicture??-1;
    const [isLoading, setIsLoading] = useState(false);

    const [linkPicture,setLinkPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif');
    const [titlePicture,setTitlePicture] = useState('');
    const [descPicture,setDescPicture] = useState('');

    useEffect(() => {
          updatePicture();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updatePicture = async () => {
            
            try {
                setIsLoading(true);
                const res = await httpClient.get("/picture/get/"+idPicture);
                let pictureObtained = res.data.data;
                setLinkPicture(pictureObtained.link);
                setTitlePicture(pictureObtained.title);
                setDescPicture(pictureObtained.description)
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
            } finally {
              setIsLoading(false)
            }
    };

    const deletePicture = async () => {
      const formData = new FormData();
      formData.append('id', idPicture);

      try {

      setIsLoading(true);
      const res = await httpClient.post("/picture/remove", formData, {
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
                <View style={styles.pictureContainer}>
                  {/* Picture  */}
                    <ImageView imageUrl={linkPicture}/> 
                </View>
                <Text style={styles.title}>{titlePicture} </Text>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.textContainer}>
                    {/* Título */}
          
                    {/* Descripción */}
                    <Text style={styles.description}>{descPicture}</Text>
                  </View>
                </ScrollView>
            </View>

            {authenticated && userInfo.userType.levelAccess == 0  && (
            <>
            <TouchableOpacity style={styles.floatingRightButton} onPress={() => navigation.navigate("pictureForm",{action:"edit",pictureId:idPicture})}>
              <Icon
              name={"pencil-box"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingLeftButton} onPress={deletePicture}>
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
    pictureContainer: {
      height: 230, // Altura fija del Picture
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
export default PictureDetail;