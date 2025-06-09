import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Extract, ExtractFilter, Home, Onboarding, PixForm, Settings, Transfer, TransferDestiny, TransferProof } from '@/views';
import Toast from 'react-native-toast-message';
import { AccountsProvider } from '@/contexts/AccountsContext';
import { navigationRef } from './navigationRef';
import { Platform } from 'react-native';
import { ResponseAccountItem } from '@/components/AccountItem/AccountItem.types';

export type RootStackParamList = {
    Onboarding: undefined;
    Home: undefined;
    PixForm: undefined;
    Settings: undefined;
    TransferDestiny: { amount: number };
    TransferProof: { accountToTransfer: ResponseAccountItem, amount: number };
    Transfer: { accountToTransfer: ResponseAccountItem, amount: number };
    Extract: undefined;
    ExtractFilter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <AccountsProvider>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    screenOptions={{
                        contentStyle: {
                            backgroundColor: 'white'
                        }
                    }}
                >
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{
                            headerShown: false,
                            animation: 'ios_from_left',
                            presentation: 'card',
                        }}
                    />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="PixForm" component={PixForm} />
                    <Stack.Screen name="TransferDestiny" component={TransferDestiny} />
                    <Stack.Screen name="Transfer" component={Transfer} />
                    <Stack.Screen name="TransferProof" component={TransferProof} options={{ headerShown: false }} />
                    <Stack.Screen name="Extract" component={Extract} />
                    <Stack.Screen
                        name="ExtractFilter"
                        component={ExtractFilter}
                        options={{
                            presentation: 'modal',
                            headerBackVisible: false,
                            headerTitleAlign: 'center',
                            title: 'Filtrar extrato'
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            presentation: 'modal',
                            headerBackVisible: false,
                            headerTitleAlign: 'center',
                            title: 'Configurações'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </AccountsProvider>
    );
}
