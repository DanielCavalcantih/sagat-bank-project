import { ResponseAccountItem } from '@/components/AccountItem/AccountItem.types';
import * as SecureStore from 'expo-secure-store';

export async function saveUserSelectedAccount(account: ResponseAccountItem) {
    await SecureStore.setItemAsync('userSelectedAccount', JSON.stringify(account));
};

export async function getUserSelectedAccount(): Promise<string | null> {
    return await SecureStore.getItemAsync('userSelectedAccount');
};

export async function removeUserSelectedAccount() {
    await SecureStore.deleteItemAsync('userSelectedAccount');
};
