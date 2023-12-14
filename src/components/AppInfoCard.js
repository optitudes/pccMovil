import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from "react-native";

import { Chip, Icon, Card } from "react-native-elements";

import { formatCreatedAt } from "../utils/helpers";
import colors from '../constants/colors';


/**Tarjeta de noticias que se renderiza en la screen de inicio y en la lista de noticias
 *
 * @param {*}
 * @returns
 */
export default function AppInfoCard({
  item,
}) {

  return (
    <View
      style={styles.card}
    >
      <Text
        style={styles.title}
        numberOfLines={3}
      >
        {item.title??""}
      </Text>
      <View style={{    borderColor: colors.PRIMARY1,  // Agregar esta línea
    borderWidth: 3,borderRadius:12,paddingBottom:10}}>

      <Text
        style={styles.content}
        numberOfLines={13}
      >
        {item.content??""}
      </Text>

      {item.list != null &&  item.list.map((nombre, index) => (
    <Text style={styles.listElement} key={index}>{`\u2022 ${nombre}`}</Text>
      ))}

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginTop: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.PRIMARY2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.PRIMARY1,
    textAlign:"left"
  },
  content: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "bold",
    color: colors.SECUNDARY5,
    textAlign:"center"
  },
 listElement: {
    marginTop: 5,
    marginLeft:10,
    fontSize: 10,
    fontWeight: "bold",
    color: colors.SECUNDARY5,
    textAlign:"left"
  },
});