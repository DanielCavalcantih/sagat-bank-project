import { Pressable, Text, TextInput, View } from "react-native";
import { inputStyles } from "./Input.styles";
import { InputProps } from "./Input.types";
import { useController } from "react-hook-form";
import { useCallback, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Input = ({
    label,
    required,
    name,
    control,
    onChangeText,
    allowOnlyNumbers,
    secureTextEntry,
    style,
    ...props
}: InputProps) => {
    const { field } = useController({
        name,
        control,
        defaultValue: null
    });
    const [visibility, setVisibility] = useState(true);

    const onChange = useCallback((text: string) => {
        if (allowOnlyNumbers) {
            text = text?.replace(/[^0-9]/g, '');
        }

        field.onChange(text || null);
        onChangeText && onChangeText(text);
    }, [field, allowOnlyNumbers, onChangeText]);

    const handleVisibility = () => setVisibility(!visibility);

    return (
        <View>
            {label && (
                <Text style={inputStyles.label}>{label} {required && '*'}</Text>
            )}

            <View>
                <TextInput
                    value={field.value}
                    onChangeText={onChange}
                    secureTextEntry={secureTextEntry && visibility}
                    {...props}
                    style={[style, inputStyles.input]}
                />

                {secureTextEntry && (
                    <Pressable onPress={handleVisibility} style={inputStyles.visibilityButton}>
                        <MaterialIcons name={visibility ? 'visibility' : 'visibility-off'} size={20} color="black" />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default Input;
