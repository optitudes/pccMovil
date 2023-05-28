import React from 'react';
import { View, Text } from 'react-native';

const PopupMessage = () => {
  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        ¡Ups! Ha ocurrido un error
      </Text>
      <Text style={{ fontSize: 16 }}>
        Lo sentimos, se produjo un error inesperado. Por favor, inténtalo de nuevo más tarde.
      </Text>
    </View>
  );
};

export default PopupMessage;
