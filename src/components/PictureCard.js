import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { Chip, Icon, Card } from "react-native-elements";

import { formatCreatedAt } from "../utils/helpers";
import colors from '../constants/colors';


/**Tarjeta de noticias que se renderiza en la screen de inicio y en la lista de noticias
 *
 * @param {*}
 * @returns
 */
export default function PictureCard({
  item,
  horizontal = false,
}) {
  const navigation = useNavigation();

  const [itemUri, setItemUri] = useState(item.link ? { uri: item.link } : require("../assets/img/imagenPorDefecto.png"));

  useEffect(() => {
    let mounted = true;
    if (mounted && item.link) {
      setItemUri(item.link ? { uri: item.link } : require("../assets/img/imagenPorDefecto.png"))
    }
    return () => {
      mounted = false
    }
  }, [item.link])

  return !horizontal ? (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("projectDetails", { idProject: item.id });
      }}
      style={{
        flex: 1,
        backgroundColor:  colors.SECUNDARY1,
        height: 380,
        marginHorizontal: 8,
        marginVertical: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.SECUNDARY3,
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
          borderColor: colors.SECUNDARY4,

        }}
        style={{
          flex: 1,
          height: 200,
          resizeMode: "cover",

        }}
        PlaceholderContent={<ActivityIndicator size="small" color={colors.SECUNDARY1} />}
        onError={() => { setItemUri(require("../assets/img/imagenPorDefecto.png")) }}

      />
      <Chip
        title={formatCreatedAt(item.created_at)}
        titleStyle={{ color: colors.SECUNDARY1 }}
        buttonStyle={{ backgroundColor: colors.PRIMARY1 }}
        containerStyle={{ position: "absolute", top: 183, right: 10 }}
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
          {item.title??""}
        </Text>
      </View>
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
          {item.title??""}
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
          borderColor: colors.SECUNDARY4,
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
          onPress={() => { navigation.navigate("viewsUserList", { idNews: item.id }) }}
        >
          <Icon
            name={"eye"}
            color={colors.SECUNDARY4}
            size={24}
            type="material-community"
          />

        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
          }}
          onPress={() => {


          }}
        >
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : (
    // tarjeta renderizada en la pantalla de inicio
    <TouchableOpacity
      onPress={() => {

            navigation.navigate("pictureDetail", { idPicture: item.id });

      }}
      style={{
        flex: 1,
        backgroundColor: colors.SECUNDARY1,
        height: 390,
        // marginHorizontal: 8,
        marginVertical: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.SECUNDARY4,
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
        PlaceholderContent={<ActivityIndicator size="small" color={colors.PRIMARY1} />}
        onError={() => { setItemUri(require("../assets/img/imagenPorDefecto.png")) }}
      />

      <Chip
        title={formatCreatedAt(item.created_at)}
        titleStyle={{ color: colors.SECUNDARY1 }}
        buttonStyle={{ backgroundColor: colors.PRIMARY1, opacity: 0.9 }}
        containerStyle={{ position: "absolute", top: 135, right: 10, zIndex: 1 }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: colors.SECUNDARY1,
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
            {item.title??""}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
            numberOfLines={4}
          >
            {item.description??""}
          </Text>
          <View
            style={{ flexDirection: "row", marginVertical: 5, width: "100%" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: colors.TERCIARY1,
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
