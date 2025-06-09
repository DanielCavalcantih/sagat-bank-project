import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export type CardProps = {
    title: string;
    icon: IconName;
    onPress: () => void;
};
