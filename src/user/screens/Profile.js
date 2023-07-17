import { View, Pressable, Text, ScrollView, HStack, VStack, useDisclose, Actionsheet,  Divider } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import {  SafeAreaView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, Modal } from "react-native";
import Login from "../../screens/auth/Login";
import authContext from '../../context/authContext';
import colors from '../../constants/colors';
import { Icon, Card, Avatar, Button, FAB, ListItem } from "react-native-elements";





const Profile = ({ navigation }) => {
const { authenticated, userInfo} = useContext(authContext);
const [selectedParticipant, setSelectedParticipant] = useState(null);


    return (
        <SafeAreaView style={{  flex: 1 }}>
            {authenticated?
            <ScrollView > 
                <View style={styles.container}>

                <Text style={styles.name}>{userInfo.name ?? ""}</Text>
                <TouchableOpacity style={{ flex: 1, flexDirection: "row", marginBottom: 8 }} onPress={() => navigation.navigate("profile")}>
                    <Avatar rounded icon={{ name: 'user', type: 'font-awesome' }}   size="medium" containerStyle={{
                    backgroundColor: "#26B99A",
                    }} />

                    <View style={{ marginLeft: 10, flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "center" }}>
                    <View style={{ flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Tipo de usuario: {userInfo.userType.name ?? ""}</Text>
                        <Text style={{ marginTop: 5 }} numberOfLines={2}>{userInfo.userType.description ?? ""}</Text>
                    </View>
                    </View>
                </TouchableOpacity>


                <Text ></Text>
                <Text ></Text>
                <Text ></Text>
                <Text ></Text>

                    <View><Text>Roles permitidos a esta cuenta</Text></View>
                <Text ></Text>
                <Text ></Text>
                <ScrollView horizontal> 
                    {userInfo.participantInfo.map((participant) => (
                        <View key={participant.name} style={styles.cardContainer}>
                        <View style={styles.cardContent}>
                          <View style={styles.readMoreIcon}>
                            <Icon
                              name="eye"
                              type="font-awesome"
                              size={16}
                              color="#242424"
                              onPress={() => setSelectedParticipant(participant)}
                            />
                          </View>
                          <Text style={styles.participantName}>{participant.name}</Text>
                        </View>
                      </View>
                    ))}
                </ScrollView > 

                <Modal
                    visible={selectedParticipant !== null}
                    animationType="fade"
                    transparent={false}
                    onRequestClose={() => setSelectedParticipant(null)}
                >
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.participantName}>{selectedParticipant?.name}</Text>
                        <Text style={styles.participantDescription}>{selectedParticipant?.description}</Text>
                        <TouchableHighlight
                        style={styles.closeButton}
                        onPress={() => setSelectedParticipant(null)}
                        underlayColor="#DDDDDD"
                        >
                        <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>


            </View>
            </ScrollView > 
            :<Login></Login>}
        </SafeAreaView >
    )
}

export default Profile;
const styles = {
      cardContainer: {
        backgroundColor: colors.PRIMARY3,
        padding: 10,
        borderRadius: 22,
        marginBottom: 10,
      },
      cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      readMoreIcon: {
        marginRight: 10,
      },
      participantName: {
        fontSize: 16,
        color: '#FFFFFF',
      },
    container: {
      flex: 1,
      backgroundColor: colors.SECUNDARY1,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333333",
    },
    userType: {
      fontSize: 18,
      marginBottom: 5,
      color: "#666666",
    },
    userTypeDescription: {
      fontSize: 16,
      marginBottom: 5,
      color: "#666666",
    },
    levelAccess: {
      fontSize: 16,
      marginBottom: 15,
      color: "#666666",
    },
    participantContainer: {
      marginBottom: 10,
    },
    participantName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#333333",
    },
    participantDescription: {
      fontSize: 14,
      color: "#666666",
    },
  };
  