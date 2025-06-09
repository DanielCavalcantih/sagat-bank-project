import { Text, View } from "react-native";
import { getExtractItemStyles } from "./ExtractItem.styles";
import { TransferType } from "@/views/Extract/Extract.types";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAccounts } from "@/contexts/AccountsContext";
import { useCallback, useMemo } from "react";
import { formatCurrency } from "@/utils/formatter";
import { COLORS } from "@/constants";

type Props = {
    transfer: TransferType;
};

const ExtractItem = ({ transfer }: Props) => {
    const { userSelectedAccount } = useAccounts();

    const isPayment = useMemo(() => {
        if (transfer.from_user_bank_account.document === userSelectedAccount?.document) {
            return true;
        }

        return false;
    }, [transfer, userSelectedAccount]);

    const extractItemStyles = getExtractItemStyles(isPayment);

    return (
        <View style={extractItemStyles.item}>
            <View style={extractItemStyles.icon}>
                <MaterialIcons
                    name={isPayment ? 'vertical-align-top' : 'vertical-align-bottom'}
                    size={32}
                    color={isPayment ? "black" : 'white'}
                />
            </View>

            <View style={extractItemStyles.info}>
                <Text style={extractItemStyles.title}>Transferência {isPayment ? 'enviada' : 'recebida'}</Text>

                <Text style={extractItemStyles.person}>
                    {
                        isPayment
                            ? transfer.to_bank_account.holder_name
                            : transfer.from_user_bank_account.holder_name
                    }
                </Text>

                <Text style={extractItemStyles.person}>R$ {formatCurrency(transfer.amount_to_transfer)}</Text>
            </View>

            <Text>{new Date(transfer.created_at).toLocaleDateString('pt-BR')}</Text>
        </View>
    );
};

export default ExtractItem;
