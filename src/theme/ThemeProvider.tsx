import React from 'react';
import {ThemeProvider as RestyleProvider} from '@shopify/restyle';

import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

import { useIsDarkMode } from "@theme/hooks";

type Props = {
	children: React.ReactElement
}
const ThemeProvider: React.FC<Props> = ({children}) => {
	const isDarkMode = useIsDarkMode();
	return <RestyleProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</RestyleProvider>;
};

export default ThemeProvider;
