import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const accountItemStyles = StyleSheet.create({
    item: {
        padding: SPACING.sm,
        backgroundColor: COLORS.gray,
        borderRadius: SPACING.xs,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
        gap: SPACING.xs
    },
    selectedBadge: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 4,
        backgroundColor: COLORS.primary
    },
    selectedText: {
        fontSize: TEXT_TYPE.p,
        color: 'white'
    },
    title: {
        fontSize: TEXT_TYPE.h6,
        color: COLORS.primary,
        fontWeight: 600
    },
    info: {
        gap: 2
    },
    accountView: {
        flexDirection: 'row',
        gap: SPACING.md
    }
});
