import { Text, View } from "react-native";
import { transferProofStyles } from "./TransferProof.styles";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { formatCurrency, maskCpfHidden } from "@/utils/formatter";
import { useAccounts } from "@/contexts/AccountsContext";
import { ActionFooter, CustomHeader } from "@/components";
import { buttonItem } from "@/components/ActionFooter/ActionFooter.types";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    route: RouteProp<RootStackParamList, 'TransferProof'>;
};

const TransferProof = ({ route }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { accountToTransfer, amount } = route.params;
    const { userSelectedAccount } = useAccounts();

    const handleDoneTransfer = useCallback(() => {
        navigation.navigate('Home');
    }, []);

    const footerButtons: buttonItem[] = useMemo(() => [{
        text: 'Compartilhar comprovante',
        variant: 'secondary'
    }, {
        text: 'Finalizar',
        onPress: handleDoneTransfer
    }], [handleDoneTransfer]);

    return (
        <View style={transferProofStyles.container}>
            <Text style={transferProofStyles.title}>Comprovante de transferência</Text>

            <Text style={transferProofStyles.amount}>R${formatCurrency(amount)}</Text>

            <View style={transferProofStyles.content}>
                <Text style={transferProofStyles.subtitle}>Dados do pagador</Text>

                <View style={transferProofStyles.infoContent}>
                    <Text style={transferProofStyles.info}>
                        Nome:
                    </Text>
                    <Text style={transferProofStyles.infoTransfer}>
                        {userSelectedAccount?.holder_name}
                    </Text>
                </View>
                <View style={transferProofStyles.infoContent}>
                    <Text style={transferProofStyles.info}>
                        CPF:
                    </Text>
                    <Text style={transferProofStyles.infoTransfer}>
                        {userSelectedAccount && maskCpfHidden(userSelectedAccount?.document)}
                    </Text>
                </View>
                <View style={transferProofStyles.infoContent}>
                    <Text style={transferProofStyles.info}>
                        Instituição:
                    </Text>
                    <Text style={transferProofStyles.infoTransfer}>
                        {userSelectedAccount?.bank_name}
                    </Text>
                </View>
            </View>

            <View style={transferProofStyles.content}>
                <Text style={transferProofStyles.subtitle}>Dados do recebedor</Text>

                <View style={transferProofStyles.infoContent}>
                    <Text style={transferProofStyles.info}>
                        Nome:
                    </Text>
                    <Text style={transferProofStyles.infoTransfer}>
                        {accountToTransfer?.holder_name}
                    </Text>
                </View>
                <View style={transferProofStyles.infoContent}>
                    <Text style={transferProofStyles.info}>
                        CPF:
                    </Text>
                    <Text style={transferProofStyles.infoTransfer}>
                        {accountToTransfer && maskCpfHidden(accountToTransfer?.document)}
                    </Text>
                </View>
                <View style={transferProofStyles.infoContent}>
                    <Text style={transferProofStyles.info}>
                        Instituição:
                    </Text>
                    <Text style={transferProofStyles.infoTransfer}>
                        {accountToTransfer?.bank_name}
                    </Text>
                </View>
            </View>

            <ActionFooter buttonList={footerButtons} />
        </View>
    );
};

export default TransferProof;
