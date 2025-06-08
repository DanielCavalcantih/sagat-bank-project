import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import {
    ReactNode,
    useMemo,
    useCallback,
    forwardRef,
    ForwardedRef,
} from 'react';
import { Portal } from 'react-native-portalize';

interface CustomBottomSheetProps extends Omit<BottomSheetModalProps, 'children' | 'snapPoints'> {
    snapPoints: (string | number)[];
    children: ReactNode;
    backdropPressDisabled?: boolean;
}

const BottomSheet = forwardRef(
    (
        {
            snapPoints,
            children,
            backdropPressDisabled = false,
            ...props
        }: CustomBottomSheetProps,
        ref: ForwardedRef<BottomSheetModal>
    ) => {
        const snapPointsOptions = useMemo(() => snapPoints, [snapPoints]);

        const renderBackdrop = useCallback(
            (backDropProps: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop
                    {...backDropProps}
                    appearsOnIndex={1}
                    disappearsOnIndex={-1}
                    pressBehavior={backdropPressDisabled ? 'none' : 'close'}
                />
            ),
            [backdropPressDisabled]
        );

        return (
            <Portal>
                <BottomSheetModal
                    ref={ref}
                    backdropComponent={renderBackdrop}
                    index={0}
                    snapPoints={snapPointsOptions}
                    {...props}
                >
                    {children}
                </BottomSheetModal>
            </Portal>
        );
    }
);

export default BottomSheet;
