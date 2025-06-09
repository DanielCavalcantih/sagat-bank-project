import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const transferDestinyStyles = StyleSheet.create({
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
    input: {
        fontSize: TEXT_TYPE.h4
    }
});
