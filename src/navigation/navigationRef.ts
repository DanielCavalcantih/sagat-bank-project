import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
    name: any,
    params?: RootStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
};
