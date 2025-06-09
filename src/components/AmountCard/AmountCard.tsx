import { Text, TouchableOpacity, View } from "react-native";
import { amountCardStyles } from "./AmountCard.styles";
import { AmmountCardProps } from "./AmountCard.types";
import { formatCurrency } from "@/utils/formatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "@/constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";

const AmmountCard = ({ account }: AmmountCardProps) => {
    const [amountIsVisible, setAmountIsVisible] = useState(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleChangeAmountVisibility = () => setAmountIsVisible(!amountIsVisible);

    const handleExtractPress = useCallback(() => {
        navigation.navigate('Extract');
    }, [navigation]);

    return (
        <View style={amountCardStyles.card}>
            <View style={amountCardStyles.amountContent}>
                <View style={amountCardStyles.visisbilityExtract}>
                    <Text style={amountCardStyles.amountText}>Seu saldo</Text>

                    <TouchableOpacity onPress={handleChangeAmountVisibility}>
                        <MaterialIcons
                            name={amountIsVisible ? 'visibility' : 'visibility-off'}
                            size={18}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleExtractPress} style={amountCardStyles.extractContent}>
                    <Text style={amountCardStyles.extractText}>Ver extrato</Text>

                    <FontAwesome6 name="chevron-right" size={12} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <Text style={amountCardStyles.amount}>
                R$ {amountIsVisible
                    ? formatCurrency(account?.amount)
                    : '•'.repeat(formatCurrency(account?.amount)?.toString()?.length || 6)}
            </Text>
        </View>
    );
};

export default AmmountCard;
