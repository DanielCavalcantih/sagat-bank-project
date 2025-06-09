import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { Platform, StyleSheet } from "react-native";

export const getSettingsStyles = (bottom: number) => StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.md,
        marginBottom: Platform.OS === 'ios' ? bottom : 0
    },
    sectionItem: {
        padding: SPACING.sm,
        borderRadius: SPACING.xs,
        backgroundColor: COLORS.gray,
        marginBottom: SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md
    },
    sectionItemText: {
        fontSize: TEXT_TYPE.h5,
        width: '100%'
    },
    sectionsHeader: {
        fontSize: TEXT_TYPE.h5
    },
    accountContainer: {
        marginBottom: SPACING.md
    },
    closeButton: {
        padding: 4
    }
});
