import { Text, View } from "react-native";
import { Button, Separator } from "@/components";
import { actionFooterStyles } from "./ActionFooter.styles";
import { FooterProps } from "./ActionFooter.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ActionFooter = ({ buttonList }: FooterProps) => {
    return (
        <>
            <View style={actionFooterStyles.footer}>
                <Separator />
                <View style={actionFooterStyles.content}>
                    {buttonList.map(({ text, variant, onPress, ...props }, index) => (
                        <Button key={text + index} variant={variant} onPress={onPress} {...props}>
                            {text}
                        </Button>
                    ))}
                </View>
            </View>
        </>
    );
};

export default ActionFooter;
