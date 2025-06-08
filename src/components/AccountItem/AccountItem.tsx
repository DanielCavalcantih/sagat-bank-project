import { Text, TouchableOpacity, View } from "react-native";
import { AccountItemType } from "./AccountItem.types";
import { accountItemStyles } from "./AccountItem.styles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from "@/constants";
import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

const AccountItem = ({ account, selected, closeModal }: AccountItemType) => {
    const { setUserSelectedAccount } = useAuth();

    const handleAccountPress = useCallback(() => {
        setUserSelectedAccount(account);
        closeModal();
    }, [account]);

    return (
        <TouchableOpacity onPress={handleAccountPress} style={accountItemStyles.item}>
            <View style={accountItemStyles.info}>
                <View style={accountItemStyles.titleContent}>
                    <Text style={accountItemStyles.title}>{account.bank_name}</Text>
                    {selected && (
                        <View style={accountItemStyles.selectedBadge}>
                            <Text style={accountItemStyles.selectedText}>Atual</Text>
                        </View>
                    )}
                </View>
                <View style={accountItemStyles.accountView}>
                    <Text>Agência: {account.agency_number}</Text>
                    <Text>Conta: {account.account_number}-{account.agency_digit}</Text>
                </View>
                <Text>Tipo: {account.account_type}</Text>
            </View>
            <View>
                <FontAwesome6 name="chevron-right" size={18} color={COLORS.primary} />
            </View>
        </TouchableOpacity>
    );
};

export default AccountItem;
