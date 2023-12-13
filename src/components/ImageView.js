import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageView = ({ imageUrl }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex:1}}>
      <TouchableOpacity onPress={toggleModal} style={{flex:1}}>
        <Image source={{ uri: imageUrl }}
         style={{ flex: 1, width: undefined, height: undefined }}
         resizeMode="cover"
         />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: imageUrl }]}
          enableSwipeDown={true}
          onCancel={toggleModal}
        />
      </Modal>
    </View>
  );
};

export default ImageView;