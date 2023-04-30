import React, { useState, useRef, useEffect } from 'react';

import { FormControl, Input, WarningOutlineIcon, Text } from 'native-base';
import { Icon } from 'react-native-elements/dist/icons/Icon';


/**Input reutilizable en la mayoría de casos
 * 
 */
const MATextInput = React.forwardRef((props, ref) => {

    const inputRef = useRef(null)
    const {
        label = "",
        variant = "underline",
        titleStyle = null,
        onChangeText,
        error = null,
        type = "text",
        Left = null,
        Right = null,
        defaultValue = null,
        editable = true,
        multiline = false,
        numberOfLines = 1,
        textAlignVertical = "center",
        onBlur = () => { },
        background = "transparent",
        placeholder="",
        labelMb="0"
    } = props;

    const [showEntry, setShowEntry] = useState(type !== "password");

    useEffect(() => {
        if (error !== null) {

            inputRef.current?.focus()
        }
    }, [error]);

    return (
        <FormControl isInvalid={error !== null}>
            <Text mb={labelMb} titleStyle fontWeight="medium">{label}</Text>
            <Input
                multiline={multiline}
                numberOfLines={numberOfLines}
                ref={inputRef}
                textAlignVertical={textAlignVertical}
                background={background}
                borderRadius={"sm"}
                defaultValue={defaultValue ?? ""}
                InputLeftElement={Left !== null ? Left : null}
                InputRightElement={Right !== null ? <Right /> : type === "password" ?
                    <Icon name={showEntry ? "eye-outline" : "eye-off-outline"} type="material-community" onPress={() => { setShowEntry(!showEntry) }} />
                    : null}
                isDisabled={!editable}
                type={type}
                secureTextEntry={!showEntry}
                variant={variant}
                onChangeText={onChangeText}
                fontSize="md"
                onBlur={onBlur}
                placeholder={placeholder}
                selectionColor="blue.300"
            // onEndEditing={(e)=>{console.log(e.nativeEvent.text)}}
            />
            {error != null ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {error}
            </FormControl.ErrorMessage> : null}

        </FormControl>
    )
})


export default MATextInput;