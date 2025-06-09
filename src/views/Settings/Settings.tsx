import { SectionList, Text, View, SectionListRenderItemInfo, Pressable } from "react-native";
import { getSettingsStyles } from "./Settings.styles";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AccountItem, ActionFooter } from "@/components";
import { buttonItem } from "@/components/ActionFooter/ActionFooter.types";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { removeUserSelectedAccount } from "@/stores/user_account";
import { removeToken } from "@/stores/token";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccounts } from "@/contexts/AccountsContext";

type SectionItem = {
    title: string;
    icon: any;
};

const Settings = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { bottom } = useSafeAreaInsets();
    const settingsStyles = getSettingsStyles(bottom);
    const { userSelectedAccount } = useAccounts();

    const handleCloseSettings = useCallback(() => {
        navigation.goBack();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={settingsStyles.closeButton} onPress={handleCloseSettings}>
                    <MaterialIcons name="close" size={24} color="black" />
                </Pressable>
            )
        });
    }, [navigation, settingsStyles]);

    const DATA: { data: SectionItem[] }[] = [
        {
            data: [
                { title: 'Minha conta', icon: 'person' },
                { title: 'Contas bancárias', icon: 'account-balance' },
                { title: 'Minhas chaves pix', icon: 'pix' },
            ]
        }
    ];

    const handleLogoutPress = useCallback(async () => {
        await removeUserSelectedAccount();
        await removeToken();
        navigation.goBack();
        navigation.navigate('Onboarding');
    }, []);

    const buttons: buttonItem[] = useMemo(() => [{
        text: 'Sair da conta',
        variant: 'secondary',
        onPress: handleLogoutPress
    }], []);

    const renderItem = useCallback(({ item }: SectionListRenderItemInfo<SectionItem>) => (
        <View style={settingsStyles.sectionItem}>
            <MaterialIcons name={item.icon} size={24} color="black" />

            <Text style={settingsStyles.sectionItemText}>{item.title}</Text>
        </View>
    ), []);

    return (
        <View style={settingsStyles.container}>
            <View style={settingsStyles.accountContainer}>
                {userSelectedAccount && (
                    <AccountItem account={userSelectedAccount} pressable={false} />
                )}
            </View>

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.title + index}
                renderItem={renderItem}
            />

            <ActionFooter buttonList={buttons} />
        </View>
    );
};

export default Settings;
