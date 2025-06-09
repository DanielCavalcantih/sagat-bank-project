import { View } from "react-native";
import Button from "../Button";
import Separator from "../Separator";
import { actionFooterStyles } from "./ActionFooter.styles";
import { FooterProps } from "./ActionFooter.types";

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
