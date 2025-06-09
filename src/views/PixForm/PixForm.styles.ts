import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const pixFormStyles = StyleSheet.create({
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
    ammount: {
        fontSize: TEXT_TYPE.h6
    },
    input: {
        fontSize: TEXT_TYPE.h4
    }
});
