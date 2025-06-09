import { Text, TouchableOpacity, View } from "react-native";
import { CustomHeaderProps } from "./CustomHeader.types";
import { getCustomHeaderStyles } from "./CustomHeader.styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CustomHeader = ({
    title,
    canGoBack = true,
    rightActionIcon,
    onRightActionPress,
    rightText
}: CustomHeaderProps) => {
    const navigation = useNavigation();
    const customHeaderStyles = getCustomHeaderStyles(canGoBack);

    const handleBackPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={customHeaderStyles.header}>
            <StatusBar style="dark" />

            <View style={customHeaderStyles.container}>
                <View style={customHeaderStyles.content}>
                    {canGoBack && (
                        <TouchableOpacity style={customHeaderStyles.iconButton} onPress={handleBackPress}>
                            <AntDesign name="left" size={20} color="black" />
                        </TouchableOpacity>
                    )}

                    <Text style={customHeaderStyles.title}>{title}</Text>
                </View>

                {rightActionIcon && (
                    <TouchableOpacity style={customHeaderStyles.rightIcon} onPress={onRightActionPress}>
                        <Text style={customHeaderStyles.rigthText}>{rightText}</Text>

                        <MaterialIcons name={rightActionIcon} size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CustomHeader;
