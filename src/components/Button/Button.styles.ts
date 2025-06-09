import { COLORS, SPACING, TEXT_TYPE, VARIANT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getButtonStyles = (
    variant?: VARIANT_TYPE,
    disabled?: boolean,
    textBold?: boolean,
    color?: string,
    textSize?: number
) => StyleSheet.create({
    button: {
        padding: SPACING.sm,
        backgroundColor: disabled ? '#F3F3F3' : variant ? COLORS[variant] : color,
        borderRadius: SPACING.xs
    },
    secondaryButton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    textButton: {
        fontSize: textSize ? textSize : TEXT_TYPE.h5,
        textAlign: 'center',
        fontWeight: textBold ? 600 : 400,
        color: disabled ? 'lightgray' : variant === 'primary' ? 'white' : 'black'
    }
});
