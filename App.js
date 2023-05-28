/**
 *App movil para la divulgacion cientifica
 * @format
 */

import React, {useState} from 'react';
import type, {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';
import AuthState from './src/context/authState';
import Navigation from './src/navigations/Navigation';
import { NativeBaseProvider } from 'native-base';
import colors from './src/constants/colors';

const App = () => {
  return (
    <AuthState>
          <SafeAreaView style={{ flex: 1 }}>
            <NativeBaseProvider>
              {Platform.OS === "android" ? <StatusBar
                animated={true}
                backgroundColor={colors.PRIMARY1}
              /> : <View

                style={{ backgroundColor: colors.PRIMARY1, height: 100, width: "100%", position: "absolute" }}
              >
                <StatusBar
                  animated={true}
                  translucent={true}
                  barStyle="light-content"
                  backgroundColor={colors.PRIMARY1}
                />
                
              </View>
              }
              <Navigation isCheckingForUpdate={false} />
            </NativeBaseProvider>
          </SafeAreaView>
  </AuthState>  
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
