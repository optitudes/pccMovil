import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { Chip, Icon, Card } from "react-native-elements";

import { formatDate } from "../utils/helpers";

/**Tarjeta de noticias que se renderiza en la screen de inicio y en la lista de noticias
 *
 * @param {*}
 * @returns
 */
export default function NewsCard({
  item,
  horizontal = false,
}) {
  const navigation = useNavigation();

  const [itemUri, setItemUri] = useState(item.ruta_imagen ? { uri: item.ruta_imagen } : require("../assets/img/imagenPorDefecto.png"));

  useEffect(() => {
    let mounted = true;
    if (mounted && item.ruta_imagen) {
      setItemUri(item.ruta_imagen ? { uri: item.ruta_imagen } : require("../assets/img/imagenPorDefecto.png"))
    }
    return () => {
      mounted = false
    }
  }, [item.ruta_imagen])

  return !horizontal ? (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("newsDetail", { idNews: item.id_noticias });
      }}
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: 380,
        marginHorizontal: 8,
        marginVertical: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#e0e0e0",
        elevation: 1,
      }}
    >
      <Card.Image
        source={itemUri}
        containerStyle={{
          width: "100%",
          height: 200,
          borderWidth: 0.5,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderColor: "#d1d1d1",

        }}
        style={{
          flex: 1,
          height: 200,
          resizeMode: "cover",

        }}
        PlaceholderContent={<ActivityIndicator size="small" color="#fff" />}
        onError={() => { setItemUri(require("../assets/img/imagenPorDefecto.png")) }}

      />
      <Chip
        title={formatDate(item.fecha_noticia)}
        titleStyle={{ color: "#fff" }}
        buttonStyle={{ backgroundColor: "#26b99a" }}
        containerStyle={{ position: "absolute", top: 183, left: 10 }}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          justifyContent: "center",
          marginTop: 15,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            marginTop: 5,
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
          numberOfLines={1}
        >
          {item.titulo_noticia}
        </Text>
        <Text numberOfLines={3} style={{ color: "#212121", marginTop: 15 }}>
          {item.descripcion_noticia.replace(/<[^>]*>?/gm, "").trim()}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginTop: 5,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          bottom: 0,
          paddingHorizontal: 15,
          borderTopWidth: 0.5,
          borderColor: "#c2c2c2",
          maxHeight: 50,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
          }}
          onPress={() => { navigation.navigate("viewsUserList", { idNews: item.id_noticias }) }}
        >
          <Icon
            name={"eye"}
            color={"#ababab"}
            size={24}
            type="material-community"
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#999999",
              marginLeft: 5,
            }}
          >
            {item.visualizaciones} Visualizaciones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
          }}
          onPress={() => {

            navigation.navigate("newsDetail", { idNews: item.id_noticias });

          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#999999",
              marginLeft: 5,
            }}
          >
            {item.comentarios} Comentarios
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : (
    // tarjeta renderizada en la pantalla de inicio
    <TouchableOpacity
      onPress={() => {

        navigation.navigate("news", { screen: "newsDetail", params: { idNews: item.id_noticias } });

      }}
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: 390,
        // marginHorizontal: 8,
        marginVertical: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#d1d1d1",
        elevation: 1,
      }}
    >

      <Card.Image
        source={itemUri}
        containerStyle={{
          width: "100%",
          flex: 1,
          borderRadius: 5,

        }}
        style={{ flex: 1, resizeMode: "cover", height: "100%" }}
        PlaceholderContent={<ActivityIndicator size="small" color="#26b99a" />}
        onError={() => { setItemUri(require("../assets/img/imagenPorDefecto.png")) }}
      />

      <Chip
          title={formatDate(item.fecha_noticia)}
        titleStyle={{ color: "#fff" }}
        buttonStyle={{ backgroundColor: "#26b99a", opacity: 0.9 }}
        containerStyle={{ position: "absolute", top: 135, left: 10, zIndex: 1 }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          left: 0,
          bottom: 0,
          height: 125,
          opacity: 0.9,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: "center",
            marginTop: 10,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            numberOfLines={1}
          >
            {item.titulo_noticia}
          </Text>
          <Text numberOfLines={2} style={{ color: "#000", marginTop: 10 }}>
            {item.descripcion_noticia.replace(/<[^>]*>?/gm, "").trim()}
          </Text>
          <View
            style={{ flexDirection: "row", marginVertical: 5, width: "100%" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#999999",
                width: "100%",
              }}
            >
              VER MÁS
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
