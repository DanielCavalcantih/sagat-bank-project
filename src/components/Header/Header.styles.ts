import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: COLORS.primary,
        justifyContent: 'flex-end',
        padding: SPACING.md,
        paddingBottom: SPACING.xl
    },
    headerTitle: {
        color: 'white',
        fontSize: TEXT_TYPE.h3,
        fontWeight: 600
    },
    headerSubtitle: {
        fontSize: TEXT_TYPE.p,
        marginTop: 4,
        color: 'white'
    },
    changeAccount: {
        flexDirection: 'row',
        gap: SPACING.xs,
        alignItems: 'center'
    },
    changeAccountText: {
        color: 'white',
        fontSize: TEXT_TYPE.h6,
        fontWeight: 500
    },
    accountInfo: {
        flexDirection: 'row',
        gap: SPACING.xs
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.xl,
        alignItems: 'center'
    }
});
