import { ActionFooter, CustomHeader, Input } from "@/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { NativeSyntheticEvent, Text, TextInputChangeEventData, View } from "react-native";
import { pixFormStyles } from "./PixForm.styles";
import { useAccounts } from "@/contexts/AccountsContext";
import { formatCurrency, formatCurrencyToNumber } from "@/utils/formatter";
import { buttonItem } from "@/components/ActionFooter/ActionFooter.types";
import { useForm } from "react-hook-form";
import { currencyMask } from "@/utils/masks";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { showError } from "@/utils";

type PixFormType = {
    value: string
};

const PixForm = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { userSelectedAccount } = useAccounts();

    const { control, handleSubmit, setValue } = useForm<PixFormType>({
        defaultValues: {
            value: 'R$ 0,00'
        }
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title="Pix" />
        });
    }, []);

    const handleChangeText = (text: string) => {
        const masked = currencyMask(text);
        setValue('value', masked);
    };

    const handleContinuePress = useCallback((values: PixFormType) => {
        const formatedValue = formatCurrencyToNumber(values.value);

        if (formatedValue <= Number(userSelectedAccount?.amount)) {
            return navigation.navigate('TransferDestiny', { amount: formatedValue });
        }

        showError({ message: 'Saldo insuficiente!' });
    }, []);

    const footerButtons: buttonItem[] = useMemo(() => [{
        text: 'Continuar',
        variant: 'primary',
        onPress: handleSubmit(handleContinuePress)
    }], [handleContinuePress]);

    return (
        <View style={pixFormStyles.container}>
            <Text style={pixFormStyles.title}>Qual o valor da sua transferência?</Text>

            <Text style={pixFormStyles.ammount}>
                Saldo disponível: R${formatCurrency(userSelectedAccount?.amount)}
            </Text>

            <Input
                control={control}
                name="value"
                autoFocus
                onChangeText={handleChangeText}
                style={pixFormStyles.input}
            />

            <ActionFooter buttonList={footerButtons} />
        </View>
    );
};

export default PixForm;
