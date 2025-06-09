import { Pressable, Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "./Button.types";
import { getButtonStyles } from "./Button.styles";
import { JSX } from "react";

const Button = ({
    onPress,
    variant,
    disabled,
    textBold = true,
    children,
    color,
    textSize,
    style,
    ...props
}: ButtonProps): JSX.Element => {
    const buttonStyles = getButtonStyles(variant, disabled, textBold, color, textSize);

    return (
        <TouchableOpacity
            {...props}
            disabled={disabled}
            style={[buttonStyles.button, variant === 'secondary' && buttonStyles.secondaryButton, style]}
            onPress={onPress}
        >
            <Text style={buttonStyles.textButton}>{children}</Text>
        </TouchableOpacity>
    );
};

export default Button;
