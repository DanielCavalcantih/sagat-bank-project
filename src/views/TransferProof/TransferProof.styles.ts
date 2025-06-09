import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const transferProofStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.md,
        gap: SPACING.md
    },
    title: {
        fontSize: TEXT_TYPE.h3,
        fontWeight: 600,
        marginTop: 40
    },
    subtitle: {
        fontSize: TEXT_TYPE.h5,
        fontWeight: 600,
    },
    amount: {
        fontSize: TEXT_TYPE.h1,
        fontWeight: 600,
        color: COLORS.primary,
        marginBottom: SPACING.lg
    },
    content: {
        padding: SPACING.md,
        borderRadius: SPACING.xs,
        borderStyle: 'solid',
        borderColor: COLORS.primary,
        gap: SPACING.xs,
        borderWidth: 1
    },
    infoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        fontSize: TEXT_TYPE.h6,
        flex: 1
    },
    infoTransfer: {
        flex: 1,
        fontSize: TEXT_TYPE.h6,
        textAlign: 'right'
    }
});