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
      <View style={{    borderColor: "green",  // Agregar esta línea
    borderWidth: 1,borderRadius:12}}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Icon name="park" size={24} color={colors.SECUNDARY3} />
        <Icon name="park" size={24} color={colors.SECUNDARY3} />
      </View>
      
      <Text
        style={styles.content}
        numberOfLines={12}
      >
        {item.content??""}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Icon name="park" size={24} color={colors.SECUNDARY3} />
        <Icon name="park" size={24} color={colors.SECUNDARY3} />
      </View>
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
    borderColor: "gray",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: colors.PRIMARY1,
    textAlign:"left"
  },
  content: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "black",
    textAlign:"center"
  },
});