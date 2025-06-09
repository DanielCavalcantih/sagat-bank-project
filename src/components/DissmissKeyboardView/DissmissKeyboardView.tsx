import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { dissmissKeyboardViewStyles } from './DissmissKeyboardView.styles';
import { DismissKeyboardViewProps } from './DissmissKeyboardView.types';

const DismissKeyboardView = ({ children }: DismissKeyboardViewProps) => {
    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()} accessible={false}>
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