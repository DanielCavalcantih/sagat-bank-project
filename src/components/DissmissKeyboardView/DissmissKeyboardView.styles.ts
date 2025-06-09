import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('screen');

export const getDissmissKeyboardViewStyles = (bottom: number) => StyleSheet.create({
    container: {
        height: height - bottom
    },
});
