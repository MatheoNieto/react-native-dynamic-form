import Color from 'color';

import {palette} from '@theme/constants';
import themeCore from '@theme/theme.core';

const darkTheme = {
	...themeCore,
	dark: true,
	colors: {
		...themeCore.colors,
		// TODO: cleanup theme colors
		backgroundPattern: palette.primary700,
		backgrounds: palette.base25,
		border: palette.base50,
		buttonBorder: palette.base100,
		buttonBorderDisabled: Color(palette.base100).alpha(0.7).rgb().string(),
		cards: palette.white,
		charlotte: palette.charlotte,
		grey100: palette.base100,
		grey200: palette.base200,
		grey25: palette.base25,
		grey300: palette.base300,
		grey400: palette.base400,
		grey50: palette.base50,
		grey900: palette.base900,
		iconPrimary: palette.base50,
		modalBackground: palette.blackAlpha500,
		orange: palette.orange,
		peach: palette.peach,
		peachOrange: palette.peachOrange,
		primary: palette.primary500,
		primaryBlue: palette.primaryBlue,
		secondary: palette.primary900,
		shadow: palette.martinique,
		skeletonBackground: palette.base100,
		skeletonHighlight: palette.polar,
		successMessage: palette.success600,
		textPrimary: palette.base900,
		textSecondary: palette.base400,
		transparent: palette.transparent,
		// future figma colors
		bodyDrop: palette.bodyDropLight,
		divider: palette.base50,
		errorAlert: palette.error500,
		errorBackground: palette.error200,
		iconBackground: palette.base50,
		iconFill: palette.base0,
		input: palette.base0,
		inputBorder: palette.base100,
		inputBorderFocused: palette.base400,
		inputDisabled: palette.base50,
		navDrop: palette.navDropLight,
		processingBackground: palette.processing200,
		scheduledBackground: palette.scheduled200,
		select: palette.base0,
		selectBorder: palette.base100,
		textPlaceholder: palette.base400,
		//	included for compatibility
		base0: palette.base900,
		base900: palette.base900,
		disabled: Color(palette.primary500).alpha(0.4).rgb().string(),
		lavender: palette.lavender,
		// PFM
		sectionListHeaderBackground: palette.base900,
		sectionListHeaderText: palette.base0,
		// PFM charts
		chartCategory1: palette.base900,
		chartCategory2: palette.primary300,
		chartCategory3: palette.primary900,
		lightGray: palette.lightGray,
		textGray: palette.textGray,
		lightBlue: palette.lightBlue,
		mustard: palette.mustard,
		lightGray2: palette.lightGray2
	},
};
export type DarkTheme = typeof darkTheme;

export default darkTheme;
