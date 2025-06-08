import { COLORS, SPACING, TEXT_TYPE, VARIANT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getButtonStyles = (variant: VARIANT_TYPE, disabled?: boolean) => StyleSheet.create({
    button: {
        padding: SPACING.sm,
        backgroundColor: disabled ? '#F3F3F3' : COLORS[variant],
        borderRadius: SPACING.xs,
        width: '100%'
    },
    secondaryButton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    textButton: {
        fontSize: TEXT_TYPE.h5,
        textAlign: 'center',
        fontWeight: 800,
        color: disabled ? 'lightgray' : variant === 'primary' ? 'white' : 'black'
    }
});
