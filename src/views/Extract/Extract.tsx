import { CustomHeader, ExtractItem } from "@/components";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { extractStyles } from "./Extract.styles";
import { fetchExtract } from "@/server/accounts";
import { useAccounts } from "@/contexts/AccountsContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TransferType } from "./Extract.types";

const Extract = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { setExtract, extract } = useAccounts();
    const [data, setData] = useState<TransferType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const loadMore = useCallback(async () => {
        if (loading || isEnd) return;

        setLoading(true);
        const newData = await fetchExtract(page);

        if (newData.bank_account_transfers.length < 10) {
            setIsEnd(true);
        }

        setData((prev) => [...prev, ...newData.bank_account_transfers]);
        setPage((prev) => prev + 1);
        setLoading(false);
    }, [loading, page, isEnd]);

    useEffect(() => {
        loadMore();
    }, []);

    const handleFilterPress = useCallback(() => {
        navigation.navigate('ExtractFilter');
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <CustomHeader
                    onRightActionPress={handleFilterPress}
                    rightText="Filtrar"
                    rightActionIcon="filter-list"
                    title="Extrato"
                />
            )
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: TransferType }) => (
        <ExtractItem transfer={item} />
    );

    return (
        <View style={extractStyles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.01}
                ListFooterComponent={
                    loading
                        ? <ActivityIndicator size="small" style={{ margin: 16 }} />
                        : null
                }
            />
        </View>
    );
};

export default Extract;
