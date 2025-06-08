import Toast, { ToastShowParams } from 'react-native-toast-message';

type ShowMessageProps = {
    message: string;
    icon?: string;
    type?: 'success' | 'error' | 'info';
} & Partial<Omit<ToastShowParams, 'text1' | 'type' | 'props'>>;

export const showMessage = ({ message, icon, ...props }: ShowMessageProps) => {
    Toast.show({
        ...props,
        visibilityTime: 2000,
        text1: message,
        type: props.type || 'info',
        props: { icon }
    });
};

export const showSuccess = (props: Omit<ShowMessageProps, 'type'>) =>
    showMessage({
        ...props,
        type: 'success'
    });

export const showError = ({ message, ...props }: Partial<ShowMessageProps>) =>
    showMessage({
        ...props,
        message: message || 'Erro interno no servidor!',
        position: 'bottom',
        bottomOffset: 100,
        type: 'error'
    });
