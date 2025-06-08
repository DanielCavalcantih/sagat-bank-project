import axios, { AxiosError, AxiosInstance } from 'axios';
import { getToken, removeToken } from '../stores/token';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { navigate } from '@/navigation/navigationRef';
import { removeUserSelectedAccount } from '@/stores/user_account';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({ baseURL });
const authenticatedClient = axios.create({ baseURL });

const clients: AxiosInstance[] = [apiClient, authenticatedClient];

const attachResponseInterceptor = (client: AxiosInstance) => {
    client.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data as { error?: string;[key: string]: any };

                if (status === 401) {
                    await removeUserSelectedAccount();
                    await removeToken();
                    navigate('Onboarding');
                }

                return Promise.reject({
                    error: {
                        ...data,
                        status,
                    },
                });
            }

            return Promise.reject({
                status: null,
                message: 'Erro de rede ou sem resposta do servidor',
                data: null,
            });
        }
    );
};

const attachAuthInterceptor = (client: AxiosInstance) => {
    client.interceptors.request.use(
        async config => {
            const token = await getToken();

            config.headers['Accept'] = 'application/json'
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
        error => Promise.reject(error)
    );
};

clients.forEach(attachResponseInterceptor);

attachAuthInterceptor(authenticatedClient);

export { apiClient, authenticatedClient };
