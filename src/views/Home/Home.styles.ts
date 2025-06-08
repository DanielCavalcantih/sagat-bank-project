import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    header: {
        height: 200,
        backgroundColor: COLORS.primary,
        justifyContent: 'flex-end',
        padding: SPACING.md,
        paddingBottom: SPACING.xl
    },
    headerTitle: {
        color: 'white',
        fontSize: TEXT_TYPE.h3,
        fontWeight: 600,
        marginTop: SPACING.xl
    },
    headerSubtitle: {
        fontSize: TEXT_TYPE.p,
        marginTop: 4,
        color: 'white'
    },
    accountInfo: {
        flexDirection: 'row',
        gap: SPACING.xs
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
    container: {
        padding: SPACING.md,
        flex: 1
    },
    bottomSheet: {
        padding: SPACING.xl
    },
    listContent: {
        gap: SPACING.md
    }
});
