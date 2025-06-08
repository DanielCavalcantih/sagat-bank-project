import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { homeStyles } from "./Home.styles";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserBankInfo, fetchUserInfo } from "@/server/user";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AccountItem, Modal } from "@/components";
import { AccountItemType, ResponseAccountItem } from "@/components/AccountItem/AccountItem.types";
import { getFirstName } from "@/utils/formatter";

const Home = () => {
    const navigation = useNavigation();
    const { setUserInfo, userSelectedAccount } = useAuth();
    const [accountsList, setAccountsList] = useState<ResponseAccountItem[] | null>(null);
    const [openModalAccounts, setOpenModalAccounts] = useState(false);

    const userAccount = useMemo(() => userSelectedAccount, [userSelectedAccount]);

    useEffect(() => {
        (async () => {
            const data = await fetchUserInfo();

            const bankData = await fetchUserBankInfo();

            if (data) {
                setUserInfo(data?.user);
            }

            if (bankData) {
                setAccountsList(bankData.user_bank_accounts);
            }
        })();
    }, []);

    const handleOpenModal = () => {
        setOpenModalAccounts(true);
    };

    const handleCloseModal = () => setOpenModalAccounts(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={homeStyles.header}>
                    <TouchableOpacity onPress={handleOpenModal} style={homeStyles.changeAccount}>
                        <FontAwesome5 name="exchange-alt" size={20} color="white" />
                        <Text style={homeStyles.changeAccountText}>Trocar conta</Text>
                    </TouchableOpacity>

                    <Text style={homeStyles.headerTitle}>Olá, {getFirstName(userAccount?.holder_name)}</Text>
                    <View style={homeStyles.accountInfo}>
                        <Text style={homeStyles.headerSubtitle}>
                            Agência: {userAccount?.agency_number}
                        </Text>
                        <Text style={homeStyles.headerSubtitle}>
                            Conta: {userAccount?.account_number}-{userAccount?.agency_digit}
                        </Text>
                    </View>
                </View>
            )
        });
    }, [navigation, userAccount]);

    return (
        <View style={homeStyles.container}>
            <Text>Home</Text>
            <Modal close={handleCloseModal} title="Selecione uma conta" visible={openModalAccounts}>
                <View style={homeStyles.listContent}>
                    {accountsList && accountsList.map((account: ResponseAccountItem, index) => (
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
