import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getCustomHeaderStyles = (canGoBack: boolean) => StyleSheet.create({
    header: {
        height: 60,
        justifyContent: 'flex-end',
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        padding: canGoBack ? 0 : SPACING.md
    },
    iconButton: {
        padding: SPACING.md
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIcon: {
        padding: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs
    },
    rigthText: {
        fontSize: TEXT_TYPE.h6
    },
    title: {
        fontSize: TEXT_TYPE.h5,
        width: '50%'
    }
});
