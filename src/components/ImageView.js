import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageView = ({ imageUrl }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={{ uri: imageUrl }} style={{ width: 360, height: 200 }} />
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