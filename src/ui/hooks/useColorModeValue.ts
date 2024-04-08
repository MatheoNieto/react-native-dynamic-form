import {Theme} from '@theme';
/**
 *
 * @param optionA
 * @param optionB
 * @returns if isDarkMode is false then optionA else optionB
 * @see https://docs.nativebase.io/dark-mode
 */
export default function useColorModeValue<
	T = Theme['colors'] | Theme['spacing'] | number | string,
>(optionA: T, optionB: T) {
	// const isDarkMode = useIsDarkMode();
	return optionA;
}
