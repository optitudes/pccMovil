import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core';

import { Pressable } from 'native-base';
import React, { useContext, useEffect } from 'react';
import { Badge } from 'react-native-elements';

import { Icon } from 'react-native-elements/dist/icons/Icon';

/**Campana de notificaciones
 * 
 * @returns 
 */
export default function NotificationsBell() {

    const navigation = useNavigation();

    const isFocused=useIsFocused();

    /*
    useEffect(() => {
        if (currentManagement||isFocused) {
            getUnread();
        }
    }, [currentManagement,isFocused]);
*/
    return (
        <Pressable
            onPress={() => navigation.navigate("notificationStack")}
            mb={"1"}
            borderRadius={"md"}
        >
           
        </Pressable>

    )
}