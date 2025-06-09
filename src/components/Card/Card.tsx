import { Text, TouchableOpacity, View } from "react-native";
import { CardProps } from "./Card.types";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from "@/constants";
import { cardStyles } from "./Card.styles";

const Card = ({ title, icon, onPress }: CardProps) => {
    return (
        <TouchableOpacity style={cardStyles.card} onPress={onPress}>
            <MaterialIcons name={icon} size={36} color={COLORS.primary} />
            <Text style={cardStyles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Card;
