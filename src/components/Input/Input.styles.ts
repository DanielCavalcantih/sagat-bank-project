import { SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        padding: SPACING.md,
        borderRadius: SPACING.xs,
        position: 'relative'
    },
    visibilityButton: {
        position: 'absolute',
        height: '100%',
        marginRight: SPACING.md,
        justifyContent: 'center',
        right: 0,
    },
    label: {
        marginBottom: SPACING.xs
    }
});
