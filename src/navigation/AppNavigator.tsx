import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Onboarding } from '@/views';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';

export type RootStackParamList = {
    Onboarding: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { bottom } = useSafeAreaInsets();
    const { height } = Dimensions.get('window');

    return (
        <KeyboardAvoidingView
            style={{ height: height - bottom }}
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
        >
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            contentStyle: {
                                backgroundColor: 'white'
                            }
                        }}
                    >
                        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
            <Toast />
        </KeyboardAvoidingView>
    );
}
