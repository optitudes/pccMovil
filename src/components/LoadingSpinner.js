import React from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

/**
 *
 * @param {Objeto} props isVisible - booleano que muestra o oculta el spinner, text - texto que se mostrara en el spinner
 * @returns
 */
export default function LoadingSpinner(props) {
  const { isVisible, text = "Cargando..." } = props;

  return isVisible ? (
    <View style={styles.container}>
      <Spinner
        visible={isVisible}
        textContent={text}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 2,
  },
});
