import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getCustomHeaderStyles = (canGoBack: boolean) => StyleSheet.create({
    header: {
        height: 110,
        justifyContent: 'flex-end',
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        padding: canGoBack ? 0 : SPACING.md
    },
    iconButton: {
        padding: SPACING.md
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: TEXT_TYPE.h5,
        width: '100%'
    }
});
