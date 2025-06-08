import React, { useEffect, useRef, useState } from 'react';
import {
    Modal as RNModal,
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { getModalStyles } from './Modal.styles';
import { ModalProps } from './Modal.types';
import { ScrollView } from 'react-native-gesture-handler';

const Modal = ({
    visible = false,
    close,
    title,
    children,
    height = 500,
}: ModalProps) => {
    const [isMounted, setIsMounted] = useState(visible);
    const slideAnim = useRef(new Animated.Value(height)).current;
    const modalStyles = getModalStyles(height);

    useEffect(() => {
        if (visible) {
            setIsMounted(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setIsMounted(false);
                close?.();
            });
        }
    }, [visible]);

    if (!isMounted) return null;

    return (
        <RNModal transparent visible animationType="none">
            <TouchableWithoutFeedback onPress={() => close?.()}>
                <View style={modalStyles.modal}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                modalStyles.container,
                                {
                                    transform: [{ translateY: slideAnim }],
                                },
                            ]}
                        >
                            <Text style={modalStyles.title}>{title}</Text>
                            <ScrollView style={modalStyles.content}>
                                {children}
                            </ScrollView>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </RNModal>
    );
};

export default Modal;
