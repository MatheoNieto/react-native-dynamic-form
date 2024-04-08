import { useColorScheme } from 'react-native';
import useTheme from './useTheme';

export default function useDarkMode() {
	const [theme] = useTheme();
	const systemTheme = useColorScheme() === 'dark';

	switch (theme) {
		case 'Light':
			return false;
		case 'Dark':
			return true;
		default:
			return systemTheme;
	}
}
