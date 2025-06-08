import { VARIANT_TYPE } from "@/constants";
import { TouchableOpacityProps } from "react-native"

export type ButtonProps = TouchableOpacityProps & {
    children?: React.ReactNode;
    onPress?: () => void;
    variant?: VARIANT_TYPE;
};
