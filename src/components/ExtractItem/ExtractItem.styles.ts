import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getExtractItemStyles = (isPaymant: boolean) => StyleSheet.create({
    item: {
        padding: SPACING.sm,
        flexDirection: 'row',
        backgroundColor: COLORS.gray,
        borderRadius: SPACING.xs,
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
        justifyContent: 'space-around'
    },
    icon: {
        padding: SPACING.xs,
        borderRadius: 30,
        backgroundColor: isPaymant ? 'lightgray' : COLORS.primary
    },
    title: {
        fontSize: TEXT_TYPE.h5,
        fontWeight: 600
    },
    info: {
        gap: 4,
        flex: 1
    },
    person: {
        fontSize: TEXT_TYPE.h5
    }
});
