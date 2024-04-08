import type { all, RestyleFunctionContainer } from '@shopify/restyle';
import type { LightTheme } from '@theme/lightTheme';
import type { TextStyle } from 'react-native';

export type FontWeight = NonNullable<TextStyle['fontWeight']>;
export type Theme = LightTheme;

export type AppRestyleFunctionContainer =
	| RestyleFunctionContainer<Record<string, any>, Theme, any>
	| RestyleFunctionContainer<Record<string, any>, Theme, any>[]
	| typeof all;

export type ThemeOptions = 'Light' | 'Dark' | 'System';
