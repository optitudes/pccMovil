import {Text, } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView,View, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity,StyleSheet } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
const VideoDetail = ({route, navigation }) => {
    const idVideo = route.params.idVideo??-1;

    return (
        <SafeAreaView style={{ flex: 1 }}>
           <View>
      {/* Video de YouTube */}
     
      <YoutubePlayer
        height={300}
        play={true}
        videoId={'KQ6zr6kCPj8'}
      />
      {/* Título */}
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Título del video</Text>

      {/* Descripción */}
      <Text style={{ fontSize: 16 }}>Descripción del video</Text>
    </View>
            
        </SafeAreaView >
    )
}
var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
export default VideoDetail;