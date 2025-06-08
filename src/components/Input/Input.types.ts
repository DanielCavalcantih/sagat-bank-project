import { Control, FieldValues } from "react-hook-form";
import { TextInputProps } from "react-native";

export type InputProps<T extends FieldValues = any> = TextInputProps & {
    label?: string;
    required?: boolean;
    name: string;
    allowOnlyNumbers?: boolean;
    control?: Control<T>;
};
