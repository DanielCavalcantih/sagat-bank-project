import { Text, TouchableOpacity, View } from "react-native";
import { AccountItemType } from "./AccountItem.types";
import { getAccountItemStyles } from "./AccountItem.styles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from "@/constants";
import { useCallback } from "react";
import { useAccounts } from "@/contexts/AccountsContext";

const AccountItem = ({ account, selected, closeModal, pressable = true }: AccountItemType) => {
    const { setUserSelectedAccount } = useAccounts();
    const accountItemStyles = getAccountItemStyles(pressable);

    const handleAccountPress = useCallback(() => {
        setUserSelectedAccount(account);
        closeModal?.();
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

                <Text>Conta {account.account_type}</Text>
            </View>

            {pressable && (
                <View>
                    <FontAwesome6 name="chevron-right" size={18} color={COLORS.primary} />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default AccountItem;
