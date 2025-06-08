import { ResponseAccountItem } from '@/components/AccountItem/AccountItem.types';
import { fetchUserBankInfo, fetchUserInfo } from '@/server/user';
import { getUserSelectedAccount, removeUserSelectedAccount, saveUserSelectedAccount } from '@/stores/user_account';
import React, { createContext, useState, useContext, ReactNode, useLayoutEffect, useEffect } from 'react';

export type User = {
    uid: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export type AuthContextType = {
    userInfo?: User;
    setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
    userSelectedAccount?: ResponseAccountItem;
    setUserSelectedAccount: React.Dispatch<React.SetStateAction<ResponseAccountItem | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
    const [userSelectedAccount, setUserSelectedAccount] = useState<ResponseAccountItem | undefined>(undefined);

    useEffect(() => {
        if (userSelectedAccount) {
            (async () => {
                await saveUserSelectedAccount(userSelectedAccount);
            })();
        }
    }, [userSelectedAccount]);

    useLayoutEffect(() => {
        (async () => {
            const selectedAccount = await getUserSelectedAccount();

            if (!selectedAccount) {
                const bankData = await fetchUserBankInfo();
                if (bankData) {
                    setUserSelectedAccount(bankData?.user_bank_accounts[0]);
                }
            } else {
                setUserSelectedAccount(JSON.parse(selectedAccount));
            }

        })();
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo, userSelectedAccount, setUserSelectedAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
