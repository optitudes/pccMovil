// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {  Icon } from "react-native-elements";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import PictureCard from '../../../components/PictureCard';
import httpClient from '../../../config/httpClient';
import colors from '../../../constants/colors';
import LoadingSpinner from '../../../components/LoadingSpinner';

import { isNotStringEmpty } from "../../../utils/helpers";


const SearchPicture = ({ navigation }) => {
    const [searchWord, setSearchWord] = useState('');
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);


    const [filteredImagesSource, setFilteredImagesSource] = useState([]);

    const toggleModal = () => {
      setIsVisible(!isVisible);
    };
      
    useEffect(() => {
          searchFilterFunction();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const searchFilterFunction = async () => {
            
        let word = isNotStringEmpty(searchWord)?searchWord: "a";
            try {
                setIsLoading(true);
                const res = await httpClient.get("/picture/search/"+word);
                let projectsObtained = res.data.data.data??[];
                var nextPage = res.data.data.next_page_url??"";
                let prevPage = res.data.data.prev_page_url??"";
                setPrevPage(prevPage)
                setNextPage(nextPage)
                setFilteredImagesSource(projectsObtained);
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
            } finally {
              setIsLoading(false)
            }

    };
     //metoo que obtiene los proyectos con la url 
    const searchByLink = async (link) => {
            
            try {
              setIsLoading(true)
                const res = await httpClient.get(link);
                let projectsObtained = res.data.data.data??[];
                let nextPage = res.data.data.next_page_url??"";
                let prevPage = res.data.data.prev_page_url??"";
                setPrevPage(prevPage)
                setNextPage(nextPage)
                setFilteredImagesSource(projectsObtained);
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
            } finally {
              setIsLoading(false);
            }


    };   
    const renderItem = ({ item }) => {
        return <PictureCard item={item} horizontal={true} style={styles.projectCard} />;
    };

    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: colors.SECUNDARY5,
            }}
          />
        );
      };
    


    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
          <LoadingSpinner isVisible={isLoading} text="Cargando..." />

          <Text style={styles.title}>Buscar Imagenes</Text>
            <View style={styles.searchBar}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) =>setSearchWord(text)}
              value={searchWord}
              underlineColorAndroid="transparent"
              placeholder="Buscar"
            />
            <TouchableOpacity onPress={searchFilterFunction}>
              <Icon
              style={styles.searchIcon}
                name={"magnify"}
                color={colors.SECUNDARY4}
                size={24}
                type="material-community"
              />
            </TouchableOpacity>
            </View>
            <FlatList
              data={filteredImagesSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={renderItem}
            />
            <View style={styles.navigationContainer}>
            {isNotStringEmpty(prevPage) && (
            <TouchableOpacity onPress={() => searchByLink(prevPage)}>
              <Icon
              style={styles.searchIcon}
                name={"arrow-left-circle"}
                color={colors.PRIMARY1}
                size={24}
                type="material-community"
              />
            </TouchableOpacity>
            )}
            {isNotStringEmpty(nextPage) && (
            <TouchableOpacity onPress={() => searchByLink(nextPage)} >
              <Icon
              style={styles.searchIcon}
                name={"arrow-right-circle"}
                color={colors.PRIMARY1}
                size={24}
                type="material-community"
              />
            </TouchableOpacity>
            )}
            </View>
          </View>
        </SafeAreaView>
      );



}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 7,
  },
    navigationContainer: {
      flexDirection: 'row',
    },
    container: {
      backgroundcolor: colors.SECUNDARY1,
      flex: 1,
    },
    searchBar: {
      flexDirection: 'row',
    },
    searchIcon: {
      padding: 10,
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      flex:1,
      flexGrow: 1,
      paddingHorizontal:10,
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: colors.APPROVED1,
      backgroundColor: colors.SECUNDARY1,
    },
    projectCard: {
        // Estilos para hacer el componente más pequeño
        // Por ejemplo:
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 8,
      },
  });
export default SearchPicture;
