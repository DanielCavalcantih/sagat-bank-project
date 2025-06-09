import { ResponseAccountItem } from '@/components/AccountItem/AccountItem.types';
import * as SecureStore from 'expo-secure-store';

export async function saveUserSelectedAccount(accountId: string) {
    return await SecureStore.setItemAsync('userSelectedAccount', accountId.toString());
};

export async function getUserSelectedAccount(): Promise<string | null> {
    return await SecureStore.getItemAsync('userSelectedAccount');
};

export async function removeUserSelectedAccount() {
    await SecureStore.deleteItemAsync('userSelectedAccount');
};
