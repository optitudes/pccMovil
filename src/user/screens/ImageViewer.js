import { Box, View } from 'native-base'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, Dimensions, } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import imageViewerContext from '../../context/imageViewerContext'
import { Icon, Image } from 'react-native-elements';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view/dist'


export default function ImageViewer({ navigation }) {


    const carouselRef = React.createRef();

    const [paginationIndex, setPaginationIndex] = useState(1);

    const [isZomming, setIsZomming] = useState(false);

    const renderItem = ({ item }) => (<ImageItem uri={item} handleZoom={(val) => setIsZomming(val)} />)
    return (
        <Box background={"gray.300"} flex={"1"}>
            <Icon name="window-close"
                onPress={() => navigation.goBack()}
                type="material-community" reverse={true} containerStyle={{ position: "absolute", top: 5, left: 5, zIndex: 4 }} size={17} />
            <Carousel
                ref={carouselRef}
                data={null}
                scrollEnabled={!isZomming}
                showsVerticalScrollIndicator={false}
                activeAnimationType="decay"
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                layoutCardOffset={0}
                activeSlideOffset={60}
                renderItem={renderItem}
                sliderWidth={Dimensions.get("window").width} // este debe ser el responsive
                itemWidth={Dimensions.get("window").width}
                firstItem={1}
                // callbackOffsetMargin={0}
                // autoplay={true}
                // swipeThreshold={100}
                onSnapToItem={() => setPaginationIndex(1)}
            />

            <Pagination
                dotsLength={1}
                activeDotIndex={paginationIndex}
                containerStyle={{ backgroundColor: "transparent", position: "absolute", bottom: 0, width: "100%" }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 2,
                    backgroundColor: "#fff",
                }}
                activeOpacity={1}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.4}
            />
        </Box>)

}


const ImageItem = ({ uri, handleZoom }) => {

    return (


        <View
            style={{
                flex: 1,
                backgroundColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                height: Dimensions.get("window").height * 0.55
            }}
        >
            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                pinchToZoomOutSensitivity={1}
                zoomCenteringLevelDistance={1}

                style={{
                    width: Dimensions.get("window").width,
                    backgroundColor: "red",
                }}
                movementSensibility={2}
                onZoomBefore={(event, gestureState, zoomableViewEventObject) => {
                    if (zoomableViewEventObject.zoomLevel == 1) {
                        handleZoom(true);
                    }
                }}
                onDoubleTapBefore={(event, gestureState, zoomableViewEventObject) => {
                    if (zoomableViewEventObject.zoomLevel > 1) {
                        handleZoom(true);
                    }
                }}
                onDoubleTapAfter={(event, gestureState, zoomableViewEventObject) => {
                    if (zoomableViewEventObject.zoomLevel == 1) {
                        handleZoom(false);
                    }
                }}
                onZoomEnd={(event, gestureState, zoomableViewEventObject) => {
                    if (zoomableViewEventObject.zoomLevel == 1) {
                        handleZoom(false);
                    }
                }}
            >
                {/* <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                        resizeMode: "contain",
                    }}
                    source={{ uri: uri }}
                /> */}

                <Image
                    source={{ uri: uri }}
                    containerStyle={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"

                    }}
                    resizeMode="contain"
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    PlaceholderContent={<ActivityIndicator size="small" color="#fff" />}
                />
            </ReactNativeZoomableView>
        </View>
    )
}
