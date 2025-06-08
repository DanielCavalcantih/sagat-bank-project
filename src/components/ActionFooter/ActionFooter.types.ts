import { VARIANT_TYPE } from "@/constants";
import { TouchableOpacityProps } from "react-native";

export type buttonItem = TouchableOpacityProps & {
    text: string;
    variant?: VARIANT_TYPE;
    onPress?: () => void;
};

export type FooterProps = {
    buttonList: buttonItem[];
};
