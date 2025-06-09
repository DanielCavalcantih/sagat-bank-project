import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    Pressable
} from 'react-native';
import DateTimePicker, {
    DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ActionFooter, Button, CustomHeader, Input, Modal } from '@/components';
import { useForm } from 'react-hook-form';
import { currencyMask } from '@/utils/masks';
import { COLORS, SPACING, TEXT_TYPE } from '@/constants';
import { buttonItem } from '@/components/ActionFooter/ActionFooter.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Calendar } from 'react-native-calendars';
import { getExtractFilterStyles } from './ExtractFilter.styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    onApplyFilters: any;
}

const ExtractFilter = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const { bottom } = useSafeAreaInsets();

    const extractFilterStyles = getExtractFilterStyles(bottom);

    const { control, handleSubmit, setValue, watch } = useForm<any>({
        defaultValues: {
            startDate: new Date().toLocaleDateString('pt-BR'),
            endDate: new Date().toLocaleDateString('pt-BR'),
            minValue: 'R$ 0,00',
            maxValue: 'R$ 0,00',
            transferType: ''
        }
    });

    const handleCloseFilter = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={extractFilterStyles.closeButton} onPress={handleCloseFilter}>
                    <MaterialIcons name="close" size={24} color="black" />
                </Pressable>
            )
        });
    }, [navigation]);

    const handleDateChange = (
        _event: DateTimePickerEvent,
        selectedDate: Date | undefined,
        isStart: boolean
    ) => {
        if (selectedDate) {
            isStart ? setValue('startDate', selectedDate) : setValue('endDate', selectedDate);
        }
    };

    const handleChangeMinValue = (text: string) => {
        const masked = currencyMask(text);
        setValue('minValue', masked);
    };

    const handleChangeMaxValue = (text: string) => {
        const masked = currencyMask(text);
        setValue('maxValue', masked);
    };

    const [transferType, startDate, endDate] = watch(['transferType', 'startDate', 'endDate']);

    const handleChangeTransferType = useCallback((type: string) => {
        setValue('transferType', type);
    }, []);

    const footerButtons: buttonItem[] = useMemo(() => [{
        text: 'Filtrar',
        variant: 'primary',
        onPress: () => null
    }], []);

    return (
        <ScrollView contentContainerStyle={extractFilterStyles.container}>
            <View>
                <Text style={extractFilterStyles.label}>Data Inicial</Text>

                <Button color={COLORS.gray} textBold={false} onPress={() => setShowStartPicker(true)}>
                    {startDate}
                </Button>

                <Modal
                    title='Selecione uma data inicial' height={420}
                    visible={showStartPicker}
                    close={() => setShowStartPicker(false)}
                >
                    <Calendar
                        onDayPress={(day) => {
                            setValue('startDate', day.dateString.split('-').reverse().join('/'));
                        }}
                        markedDates={{
                            [startDate.split('/').reverse().join('-')]: {
                                selected: true,
                                selectedColor: COLORS.primary,
                            },
                        }}
                        theme={{
                            selectedDayBackgroundColor: COLORS.primary,
                            todayTextColor: COLORS.primary,
                            arrowColor: COLORS.primary,
                        }}
                    />
                </Modal>
            </View>

            <View>
                <Text style={extractFilterStyles.label}>Data Final</Text>

                <Button color={COLORS.gray} textBold={false} onPress={() => setShowEndPicker(true)}>
                    {endDate}
                </Button>

                <Modal
                    title='Selecione uma data final' height={420}
                    visible={showEndPicker}
                    close={() => setShowEndPicker(false)}
                >
                    <Calendar
                        onDayPress={(day) => {
                            setValue('endDate', day.dateString.split('-').reverse().join('/'));
                        }}
                        markedDates={{
                            [endDate.split('/').reverse().join('-')]: {
                                selected: true,
                                selectedColor: COLORS.primary,
                            },
                        }}
                        theme={{
                            selectedDayBackgroundColor: COLORS.primary,
                            todayTextColor: COLORS.primary,
                            arrowColor: COLORS.primary,
                        }}
                    />
                </Modal>
            </View>

            <View style={extractFilterStyles.valueContainer}>
                <Input
                    control={control}
                    name="minValue"
                    style={extractFilterStyles.input}
                    label="Valor mínimo"
                    onChangeText={handleChangeMinValue}
                />

                <Input
                    control={control}
                    name="maxValue"
                    style={extractFilterStyles.input}
                    label="Valor máximo"
                    onChangeText={handleChangeMaxValue}
                />
            </View>

            <View>
                <Text style={extractFilterStyles.label}>Tipo de Transferência</Text>

                <View style={extractFilterStyles.transfers}>
                    <Button
                        style={extractFilterStyles.buttonTypes}
                        textBold={transferType === ''}
                        onPress={() => handleChangeTransferType('')}
                        textSize={TEXT_TYPE.h6}
                        variant={transferType === '' ? 'primary' : 'secondary'}
                    >
                        Todos
                    </Button>
                    <Button
                        style={extractFilterStyles.buttonTypes}
                        textBold={transferType === 'sent'}
                        onPress={() => handleChangeTransferType('sent')}
                        textSize={TEXT_TYPE.h6}
                        variant={transferType === 'sent' ? 'primary' : 'secondary'}
                    >
                        Enviados
                    </Button>
                    <Button
                        style={extractFilterStyles.buttonTypes}
                        textBold={transferType === 'received'}
                        onPress={() => handleChangeTransferType('received')}
                        textSize={TEXT_TYPE.h6}
                        variant={transferType === 'received' ? 'primary' : 'secondary'}
                    >
                        Recebidos
                    </Button>
                </View>
            </View>

            <ActionFooter buttonList={footerButtons} />
        </ScrollView>
    );
};

export default ExtractFilter;
