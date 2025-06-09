import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { getDissmissKeyboardViewStyles } from './DissmissKeyboardView.styles';
import { DismissKeyboardViewProps } from './DissmissKeyboardView.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DismissKeyboardView = ({ children }: DismissKeyboardViewProps) => {
    const { bottom } = useSafeAreaInsets();

    const dissmissKeyboardViewStyles = getDissmissKeyboardViewStyles(bottom);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <KeyboardAvoidingView
                style={dissmissKeyboardViewStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {children}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default DismissKeyboardView;