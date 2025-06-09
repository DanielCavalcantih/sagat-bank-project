import { SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const extractStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.md
    },
    noTransfer: {
        fontSize: TEXT_TYPE.h4,
        textAlign: 'center'
    }
});