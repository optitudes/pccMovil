import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';




const PasswordInput = React.forwardRef((props, ref) => {
    const { label, error, value, onChangeText, IconLeft, show = true, style,editable=true } = props


    const [showPassword, setShowPassword] = useState(show);

    return (
        <TextInput
            ref={ref}
            mode="flat"
            style={style}
            theme={{
                colors: { text: "black", primary: "rgb(33, 151, 186)" },
            }}
            label={label}
            error={error}
            value={value}
            underlineColor={"transparent"}
            secureTextEntry={showPassword}
            editable={editable}
            onChangeText={(text) => onChangeText(text)}
            left={
                <TextInput.Icon
                    name={() => (
                        <IconLeft />
                    )}
                />
            }
            textContentType={showPassword ? "none" : "password"}
            right={
                <TextInput.Icon
                    onPress={() => { setShowPassword(!showPassword) }}
                    name={() => (
                        <Icon
                            name={!showPassword ? "eye-outline" : "eye-off-outline"}
                            type="material-community"
                            size={20}

                        />
                    )}
                />
            }
        />

    )

});
export default PasswordInput;