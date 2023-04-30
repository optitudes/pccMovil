import { Box, HStack, Pressable, ScrollView, Text, } from 'native-base'
import React, { useContext } from 'react'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import authContext from '../../context/authContext'


export default function ManagementSelector() {
    const { managements, makeChange } = useContext(authContext)


    return (
        <ScrollView
            _contentContainerStyle={{
                // flex: "1",
                minW: "72",
                backgroundColor: "#26b99a"
            }}
            style={{ backgroundColor: "#FFF" }}
        >
            <Box flex="1" backgroundColor="#26b99a"  >
                <HStack justifyContent="space-between" mb="5" alignItems="flex-start" pt="3">
                    {/* <Icon name="arrow-left" type="material-community" color="#fff" containerStyle={{ marginLeft: 15, marginTop: 5 }}  /> */}

                    <Box flexDirection="column" alignItems="flex-start" pl="3" flex="1" ml="1">
                        <Text fontSize="xl" fontWeight="bold" color="gray.100" >Bienvendo</Text>
                        {/* <Text fontSize="sm" fontWeight="light" color="gray.50">De </Text> */}
                    </Box>
         
                </HStack>

                <Box backgroundColor="white" borderTopRadius="3xl" p="5"  >
                    <Text fontSize={"md"} textAlign={"center"} mb="8" fontWeight={"semibold"}>Selecciona la administración con la que deseas ingresar</Text>
                    {managements.map((element, index) => (
                        <Pressable key={index}
                            onPress={() => makeChange(element.id_uar, element.management_id, element.management_description)}
                            mb={"2"}
                            borderRadius={"md"}
                        >
                            {({ isHovered, isFocused, isPressed }) => (
                                <HStack background={isPressed ? "teal.200" : "teal.100"} p="3" borderRadius={"md"} justifyContent={"space-between"} alignItems={"center"}>
                                    <>
                                        <Icon name="home-city" type="material-community" size={17} color="#115e59" containerStyle={{ marginRight: 8 }} />
                                        <Text textAlign={"left"} fontWeight={"semibold"} flex="1" pr={"3"} color={"teal.800"}>{element.management_description}</Text>


                                    </>
                                    <Icon name="chevron-right" type="material-community" size={17} color="#115e59" />

                                </HStack>

                            )}
                        </Pressable>
                    ))}
                </Box>
            </Box>
        </ScrollView>
    )
}