import { SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getModalStyles = (height: number) => StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    container: {
        height,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: TEXT_TYPE.h5,
        textAlign: 'center',
        marginBottom: SPACING.md
    },
    content: {
        maxHeight: height
    }
});
