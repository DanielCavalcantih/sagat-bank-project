import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const amountCardStyles = StyleSheet.create({
    card: {
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        backgroundColor: COLORS.gray
    },
    amountContent: {
        flexDirection: 'row',
        gap: SPACING.sm,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    visisbilityExtract: {
        flexDirection: 'row',
        gap: SPACING.xs,
        alignItems: 'center'
    },
    amountText: {
        fontSize: TEXT_TYPE.h6,
        width: 70
    },
    amount: {
        fontSize: TEXT_TYPE.h3,
        fontWeight: 600,
        marginTop: SPACING.sm
    },
    extractContent: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    extractText: {
        fontSize: TEXT_TYPE.p,
        fontWeight: 600,
        color: COLORS.primary
    }
});
