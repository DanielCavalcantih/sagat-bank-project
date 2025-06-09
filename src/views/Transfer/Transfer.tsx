import { Text, View } from "react-native";
import { transferStyles } from "./Transfer.styles";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { formatCurrency, maskCpfHidden } from "@/utils/formatter";
import { ActionFooter, CustomHeader } from "@/components";
import { buttonItem } from "@/components/ActionFooter/ActionFooter.types";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { BankTransfer, trasnfer } from "@/server/accounts";
import { useAccounts } from "@/contexts/AccountsContext";
import { showError, showSuccess } from "@/utils";

type Props = {
    route: RouteProp<RootStackParamList, 'Transfer'>;
};

const Transfer = ({ route }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { accountToTransfer, amount } = route.params;
    const { userSelectedAccount, fetchUserAccountsList } = useAccounts();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title="Pix" />
        });
    }, [navigation]);

    const handleTransferPress = useCallback(async () => {
        const body: BankTransfer = {
            bank_account_transfer: {
                to_user_bank_account_id: Number(accountToTransfer.id),
                from_user_bank_account_id: Number(userSelectedAccount?.id),
                amount_to_transfer: amount,
                transfer_type: 1
            }
        };

        const response = await trasnfer(body);

        if (response.error) {
            return showError({ message: response.error.message || 'Erro interno no servidor!' })
        }

        fetchUserAccountsList();
        navigation.navigate('TransferProof', { accountToTransfer: accountToTransfer, amount });
        showSuccess({ message: response.message })
    }, []);

    const footerButtons: buttonItem[] = useMemo(() => [{
        text: 'Transferir',
        variant: 'primary',
        onPress: handleTransferPress
    }], [handleTransferPress]);

    return (
        <View style={transferStyles.container}>
            <Text style={transferStyles.title}>Confirmação de transferência</Text>

            <Text style={transferStyles.amount}>R$ {formatCurrency(amount)}</Text>

            <View style={transferStyles.receiverContent}>
                <Text style={transferStyles.receiver}>
                    Para:
                </Text>

                <Text style={transferStyles.receiverInfo}>
                    {accountToTransfer.holder_name}
                </Text>
            </View>

            <View style={transferStyles.receiverContent}>
                <Text style={transferStyles.receiver}>
                    CPF:
                </Text>

                <Text style={transferStyles.receiverInfo}>
                    {maskCpfHidden(accountToTransfer.document)}
                </Text>
            </View>

            <View style={transferStyles.receiverContent}>
                <Text style={transferStyles.receiver}>
                    Instituição:
                </Text>

                <Text style={transferStyles.receiverInfo}>
                    {accountToTransfer.bank_name}
                </Text>
            </View>

            <ActionFooter buttonList={footerButtons} />
        </View>
    )
};

export default Transfer;
