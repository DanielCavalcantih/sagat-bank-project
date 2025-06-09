import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.gray,
        padding: SPACING.md,
        height: 100,
        width: 92,
        justifyContent: 'space-between',
        borderRadius: SPACING.sm,
        alignItems: 'center'
    },
    title: {
        fontSize: TEXT_TYPE.h6,
        fontWeight: 600
    }
});
