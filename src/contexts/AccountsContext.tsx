import { ResponseAccountItem } from '@/components/AccountItem/AccountItem.types';
import { fetchUserAccounts } from '@/server/user';
import { showError } from '@/utils';
import React, { createContext, useState, useContext, ReactNode, useLayoutEffect, useEffect, useCallback } from 'react';

export type AccountsContextType = {
    accountsList?: ResponseAccountItem[];
    setAccountsList: React.Dispatch<React.SetStateAction<ResponseAccountItem[] | undefined>>;
    userAccountsList?: ResponseAccountItem[];
    setUserAccountsList: React.Dispatch<React.SetStateAction<ResponseAccountItem[] | undefined>>;
    userSelectedAccount?: ResponseAccountItem;
    setUserSelectedAccount: React.Dispatch<React.SetStateAction<ResponseAccountItem | undefined>>;
    fetchUserAccountsList: () => void;
};

const AccountsContext = createContext<AccountsContextType | undefined>(undefined);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
    const [accountsList, setAccountsList] = useState<ResponseAccountItem[] | undefined>(undefined);
    const [userAccountsList, setUserAccountsList] = useState<ResponseAccountItem[] | undefined>(undefined);
    const [userSelectedAccount, setUserSelectedAccount] = useState<ResponseAccountItem | undefined>(undefined);

    const fetchUserAccountsList = useCallback(async () => {
        const response = await fetchUserAccounts();

        if (response.error) {
            showError({ message: 'Erro interno no servidor!' });
        }

        if (response?.user_bank_accounts) {
            setUserAccountsList(response.user_bank_accounts);
        }
    }, []);

    return (
        <AccountsContext.Provider
            value={{
                userAccountsList,
                setUserAccountsList,
                userSelectedAccount,
                setUserSelectedAccount,
                accountsList,
                fetchUserAccountsList,
                setAccountsList
            }}
        >
            {children}
        </AccountsContext.Provider>
    );
};

export const useAccounts = () => {
    const context = useContext(AccountsContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
};
