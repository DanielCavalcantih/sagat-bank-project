import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

export const onboardingStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.xl,
        gap: SPACING.xs
    },
    title: {
        fontSize: TEXT_TYPE.h3,
        color: COLORS.primary,
        fontWeight: 800,
        marginTop: 80
    },
    subtitle: {
        fontSize: TEXT_TYPE.h4,
        fontWeight: 600
    },
    containerInputs: {
        marginTop: SPACING.xl,
        gap: SPACING.xl
    },
    createAccountText: {
        fontSize: TEXT_TYPE.h6,
        textAlign: 'center',
        marginTop: SPACING.md,
    },
    createAccount: {
        fontSize: TEXT_TYPE.h6,
        color: COLORS.primary
    }
});
