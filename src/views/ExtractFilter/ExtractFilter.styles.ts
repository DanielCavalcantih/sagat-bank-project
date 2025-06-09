import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { Platform, StyleSheet } from "react-native";

export const getExtractFilterStyles = (bottom: number) => StyleSheet.create({
    container: {
        padding: SPACING.md,
        gap: SPACING.xl,
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? bottom : 0
    },
    label: {
        marginBottom: 4
    },
    input: {
        fontSize: TEXT_TYPE.h6,
        minWidth: '46%'
    },
    valueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.xl
    },
    button: {
        backgroundColor: COLORS.gray
    },
    transfers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonTypes: {
        width: 100,
        marginTop: 4,
        padding: SPACING.xs
    },
    closeButton: {
        padding: 4
    }
});
