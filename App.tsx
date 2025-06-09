import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '@/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { DismissKeyboardView } from '@/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Host } from 'react-native-portalize';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
	monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
	dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
	dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
	today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<SafeAreaProvider>
					<Host>
						<DismissKeyboardView>
							<AppNavigator />
						</DismissKeyboardView>
					</Host>
				</SafeAreaProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
