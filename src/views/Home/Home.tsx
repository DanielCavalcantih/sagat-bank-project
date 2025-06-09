import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { homeStyles } from "./Home.styles";
import { useAccounts } from "@/contexts/AccountsContext";
import { AccountItem, AmountCard, Card, Header, Modal } from "@/components";
import { ResponseAccountItem } from "@/components/AccountItem/AccountItem.types";
import { StatusBar } from "expo-status-bar";
import { CardProps } from "@/components/Card/Card.types";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { getUserSelectedAccount, saveUserSelectedAccount } from "@/stores/user_account";
import { fetchUserAccounts } from "@/server/user";
import { fetchAccounts, fetchExtract } from "@/server/accounts";
import { SPACING } from "@/constants";

const Home = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const {
        userSelectedAccount,
        userAccountsList,
        setUserSelectedAccount,
        setUserAccountsList,
        setAccountsList,
        setExtract
    } = useAccounts();
    const [openModalAccounts, setOpenModalAccounts] = useState(false);

    const userAccount = useMemo(() => userSelectedAccount, [userSelectedAccount]);

    const handleOpenModal = () => setOpenModalAccounts(true);
    const handleCloseModal = () => setOpenModalAccounts(false);

    useEffect(() => {
        if (userAccount) {
            (async () => {
                await saveUserSelectedAccount(userAccount.id);
            })();
        }
    }, [userAccount]);

    useLayoutEffect(() => {
        (async () => {
            const accountsData = await fetchAccounts();

            if (accountsData) {
                setAccountsList(accountsData.user_bank_accounts);
            }

            const userAccountsData = await fetchUserAccounts();
            const selectedAccountId = await getUserSelectedAccount();

            if (userAccountsData) {
                setUserAccountsList(userAccountsData.user_bank_accounts);

                const fallbackAccount = userAccountsData.user_bank_accounts[0];

                const selectedAccount = userAccountsData.user_bank_accounts.find(
                    (item: ResponseAccountItem) => item.id == selectedAccountId
                );

                if (selectedAccount) {
                    setUserSelectedAccount(selectedAccount);
                } else {
                    setUserSelectedAccount(fallbackAccount);
                    await saveUserSelectedAccount(fallbackAccount.id);
                }
            }
        })();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <Header handleOpenModal={handleOpenModal} />
        });
    }, [navigation, userAccount]);

    const handlePixPress = useCallback(() => {
        navigation.navigate('PixForm');
    }, [navigation]);

    const cardList: CardProps[] = [{
        title: 'Pix',
        icon: 'pix',
        onPress: handlePixPress
    }, {
        title: 'Bancos',
        icon: 'account-balance',
        onPress: () => null
    }, {
        title: 'Cartões',
        icon: 'payment',
        onPress: () => null
    }, {
        title: 'Investir',
        icon: 'bar-chart',
        onPress: () => null
    }];

    return (
        <View style={homeStyles.container}>
            <StatusBar style="light" />

            <View style={homeStyles.containerAmount}>
                <AmountCard account={userSelectedAccount} />
            </View>

            <FlatList
                data={cardList}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <Card title={item.title} icon={item.icon} onPress={item.onPress} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: SPACING.md, paddingHorizontal: SPACING.md }}
            />

            <Modal open={handleOpenModal} close={handleCloseModal} title="Selecione uma conta bancária" visible={openModalAccounts}>
                <View style={homeStyles.listContent}>
                    {userAccountsList && userAccountsList?.map((account: ResponseAccountItem, index) => (
                        <AccountItem
                            key={index + account.bank_name}
                            account={account}
                            selected={account.id === userAccount?.id}
                            closeModal={handleCloseModal}
                        />
                    ))}
                </View>
            </Modal>
        </View>
    );
};

export default Home;
