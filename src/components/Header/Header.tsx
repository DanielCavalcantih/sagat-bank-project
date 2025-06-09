import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { headerStyles } from "./Header.styles";
import { getFirstName } from "@/utils/formatter";
import { useAccounts } from "@/contexts/AccountsContext";
import { HeaderProps } from "./Header.types";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useCallback } from "react";

const Header = ({ handleOpenModal }: HeaderProps) => {
    const { userSelectedAccount } = useAccounts();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePressMenu = useCallback(() => {
        navigation.navigate('Settings');
    }, [navigation]);

    return (
        <View style={headerStyles.header}>
            <TouchableOpacity onPress={handleOpenModal} style={headerStyles.changeAccount}>
                <FontAwesome5 name="exchange-alt" size={20} color="white" />
                <Text style={headerStyles.changeAccountText}></Text>
            </TouchableOpacity>

            <View style={headerStyles.userInfo}>
                <View>
                    <Text style={headerStyles.headerTitle}>Olá, {getFirstName(userSelectedAccount?.holder_name)}</Text>
                </View>

                <TouchableOpacity onPress={handlePressMenu}>
                    <Ionicons name="settings-sharp" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Header;
