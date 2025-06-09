import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const transferStyles = StyleSheet.create({
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
    amount: {
        fontSize: TEXT_TYPE.h1,
        fontWeight: 600,
        color: COLORS.primary,
        marginBottom: 40
    },
    receiverContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    receiver: {
        fontSize: TEXT_TYPE.h5,
        flex: 1
    },
    receiverInfo: {
        fontSize: TEXT_TYPE.h5,
        flex: 1,
        textAlign: 'right'
    }
});
