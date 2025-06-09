import { Text, TouchableOpacity, View } from "react-native"
import { onboardingStyles } from "./Onboarding.styles";
import { ActionFooter, Input } from "@/components";
import { buttonItem } from "@/components/ActionFooter/ActionFooter.types";
import { useForm } from 'react-hook-form';
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { createAccount, login } from "@/server/auth";
import {
    showError,
    showSuccess,
    emailValidator,
    passwordValidator
} from "@/utils";
import { getToken, saveToken } from "@/stores/token";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";

export type LoginForm = {
    name?: string;
    email: string;
    password: string;
}

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Onboarding = () => {
    const navigation = useNavigation<Navigation>();
    const { control, handleSubmit, reset, watch } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const [isRegister, setIsRegister] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            const token = await getToken();
            if (token) navigation.navigate('Home');
        })();
    }, []);

    const handleSave = useCallback(async (values: LoginForm) => {
        const response: any = isRegister ? await createAccount(values) : await login(values);

        if (response.data) {
            await saveToken(response.data?.token);
            isRegister && showSuccess({ message: 'Conta criada com sucesso!' })
            navigation.navigate('Home');
        }

        if (response.error) {
            showError({ message: response.error.message });
        }
    }, [isRegister]);

    const [email, name, password] = watch(['email', 'name', 'password']);

    const isFormValid = useMemo(() => {
        if (isRegister) {
            return !!name?.trim() && emailValidator(email) && passwordValidator(password);
        }

        return emailValidator(email) && passwordValidator(password);
    }, [isRegister, email, name, password]);

    const buttons: buttonItem[] = useMemo(() => [{
        text: isRegister ? 'Criar conta' : 'Entrar',
        variant: 'primary',
        onPress: handleSubmit(handleSave),
        disabled: !isFormValid
    }], [isRegister, isFormValid])

    const handleChangeForm = useCallback(() => {
        setIsRegister(!isRegister);
        reset();
    }, [isRegister]);

    return (
        <View style={onboardingStyles.container}>
            <Text style={onboardingStyles.title}>SAGAT BANK</Text>
            <Text style={onboardingStyles.subtitle}>Seja bem-vindo(a)</Text>
            <View style={onboardingStyles.containerInputs}>
                {isRegister && (
                    <Input
                        name="name"
                        required={isRegister}
                        control={control}
                        label="Nome"
                        placeholder="Digite seu nome"
                    />
                )}
                <Input
                    name="email"
                    control={control}
                    required={isRegister}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                />
                <Input
                    name="password"
                    control={control}
                    required={isRegister}
                    label="Senha"
                    secureTextEntry
                    placeholder="Digite sua senha"
                />
            </View>

            <TouchableOpacity onPress={handleChangeForm}>
                {isRegister ? (
                    <Text style={onboardingStyles.createAccountText}>
                        Já possui uma conta?
                        <Text style={onboardingStyles.createAccount}> Faça login</Text>
                    </Text>
                ) : (
                    <Text style={onboardingStyles.createAccountText}>
                        Ainda não possui uma conta?
                        <Text style={onboardingStyles.createAccount}> Crie agora</Text>
                    </Text>
                )}
            </TouchableOpacity>

            <ActionFooter buttonList={buttons} />
        </View>
    )
};

export default Onboarding;