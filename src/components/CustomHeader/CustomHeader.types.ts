import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export type CustomHeaderProps = {
    title: string;
    canGoBack?: boolean;
    rightActionIcon?: IconName;
    onRightActionPress?: () => void;
    rightText?: string;
};
