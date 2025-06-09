import { CustomHeader, ExtractItem } from "@/components";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { extractStyles } from "./Extract.styles";
import { fetchExtract } from "@/server/accounts";
import { useAccounts } from "@/contexts/AccountsContext";
import { FlatList } from "react-native-gesture-handler";
import { TransferType } from "./Extract.types";
import { formatCurrencyToNumber } from "@/utils/formatter";

const Extract = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { extractFilter, userSelectedAccount } = useAccounts();
    const [data, setData] = useState<TransferType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const cleanedFilters = useMemo(() => {
        const min = formatCurrencyToNumber(extractFilter?.minValue || '');
        const max = formatCurrencyToNumber(extractFilter?.maxValue || '');

        return {
            minValue: min === 0 ? '' : min,
            maxValue: max === 0 ? '' : max,
            startDate: extractFilter?.startDate ?? '',
            endDate: extractFilter?.endDate ?? '',
            transferType: extractFilter?.transferType ?? '',
        };
    }, [extractFilter]);

    const loadNextPage = useCallback(async (reset = false) => {
        if (loading || (isEnd && !reset)) return;

        setLoading(true);

        const nextPage = reset ? 1 : page;
        const response = await fetchExtract(nextPage, cleanedFilters);
        const newTransfers = response.bank_account_transfers.filter((transfer: TransferType) =>
            transfer.from_user_bank_account.document === userSelectedAccount?.document ||
            transfer.to_bank_account.document === userSelectedAccount?.document);

        if (reset) {
            setData(newTransfers);
            setPage(2);
        } else {
            setData(prev => [...prev, ...newTransfers]);
            setPage(prev => prev + 1);
        }

        setIsEnd(response.current_page >= response.total_pages);

        setLoading(false);
    }, [loading, page, isEnd, cleanedFilters]);


    useEffect(() => {
        setIsEnd(false);
        setPage(1);
        loadNextPage(true);
    }, [cleanedFilters]);


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
            {data?.length ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    onEndReached={() => loadNextPage()}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={
                        loading
                            ? <ActivityIndicator size="small" style={{ margin: 16 }} />
                            : null
                    }
                />
            ) : (
                <Text style={extractStyles.noTransfer}>Nenhuma transferência realizada!</Text>
            )}
        </View>
    );
};

export default Extract;
