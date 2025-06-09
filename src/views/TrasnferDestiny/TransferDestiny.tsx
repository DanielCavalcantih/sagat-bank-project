import { Text, View } from "react-native";
import { transferDestinyStyles } from "./TransferDestiny.styles";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { formatCurrency } from "@/utils/formatter";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { ActionFooter, CustomHeader, Input } from "@/components";
import { useForm } from "react-hook-form";
import { useAccounts } from "@/contexts/AccountsContext";
import { buttonItem } from "@/components/ActionFooter/ActionFooter.types";
import { showError } from "@/utils";
import { cpfMask } from "@/utils/masks";

type Props = {
    route: RouteProp<RootStackParamList, 'TransferDestiny'>;
};

type TransferDestinyType = {
    destiny: string;
};

const TransferDestiny = ({ route }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { amount } = route.params;
    const { accountsList } = useAccounts();
    console.log(accountsList);


    const { control, handleSubmit, reset, watch, setValue } = useForm<TransferDestinyType>({
        defaultValues: {
            destiny: ''
        }
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title="Pix" />
        });
    }, [navigation]);

    const handleChangeText = (text: string) => {
        const masked = cpfMask(text);
        setValue('destiny', masked);
    };

    const handleContinuePress = useCallback((values: TransferDestinyType) => {
        const document = values.destiny.replace(/\D/g, '');
        const findAccount = accountsList?.find(account => account.document === document);

        if (findAccount) {
            return navigation.navigate('Transfer', { accountToTransfer: findAccount, amount });
        }

        showError({ message: 'Chave Pix não encontrada!' });
    }, []);

    const footerButtons: buttonItem[] = useMemo(() => [{
        text: 'Continuar',
        onPress: handleSubmit(handleContinuePress)
    }], [handleContinuePress]);

    return (
        <View style={transferDestinyStyles.container}>
            <Text style={transferDestinyStyles.title}>
                Para quem você quer transferir R$ {formatCurrency(amount)}?
            </Text>

            <Input
                control={control}
                name="destiny"
                placeholder="Digite a chave Pix"
                onChangeText={handleChangeText}
                autoFocus
                style={transferDestinyStyles.input}
            />

            <ActionFooter buttonList={footerButtons} />
        </View>
    );
};

export default TransferDestiny;
