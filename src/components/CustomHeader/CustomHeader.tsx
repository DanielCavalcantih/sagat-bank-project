import { Text, TouchableOpacity, View } from "react-native";
import { CustomHeaderProps } from "./CustomHeader.types";
import { getCustomHeaderStyles } from "./CustomHeader.styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";

const CustomHeader = ({ title, canGoBack = true }: CustomHeaderProps) => {
    const navigation = useNavigation();
    const customHeaderStyles = getCustomHeaderStyles(canGoBack);

    const handleBackPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={customHeaderStyles.header}>
            <StatusBar style="dark" />

            <View style={customHeaderStyles.content}>
                {canGoBack && (
                    <TouchableOpacity style={customHeaderStyles.iconButton} onPress={handleBackPress}>
                        <AntDesign name="left" size={20} color="black" />
                    </TouchableOpacity>
                )}
                <Text style={customHeaderStyles.title}>{title}</Text>
            </View>
        </View>
    );
};

export default CustomHeader;
