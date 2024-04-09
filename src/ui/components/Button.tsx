import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import {
	backgroundColor,
	BackgroundColorProps,
	backgroundColorShorthand,
	BackgroundColorShorthandProps,
	border,
	BorderProps,
	color,
	ColorProps,
	composeRestyleFunctions,
	createVariant,
	layout,
	LayoutProps,
	opacity,
	OpacityProps,
	position,
	PositionProps,
	spacing,
	SpacingProps,
	spacingShorthand,
	SpacingShorthandProps,
	typography,
	TypographyProps,
	VariantProps,
} from '@shopify/restyle';
import { Theme, useAppRestyle } from '@theme';

import { useFontStyle } from '@ui/hooks';
import { forwardRef, getKeys } from '@ui/utils';

import BaseButton, { BaseButtonProps } from './BaseButton';
import BaseSpinner from './BaseSpinner';

type RestyleButtonProps = VariantProps<Theme, 'buttonVariants'> &
	SpacingProps<Theme> &
	SpacingShorthandProps<Theme> &
	BorderProps<Theme> &
	BackgroundColorShorthandProps<Theme> &
	BackgroundColorProps<Theme> &
	PositionProps<Theme> &
	ColorProps<Theme> &
	LayoutProps<Theme> &
	TypographyProps<Theme> &
	OpacityProps<Theme>;

export type ButtonProps = RestyleButtonProps &
	Omit<BaseButtonProps, 'disabled'> & {
	children?: React.ReactText;
	spinner?: React.ReactElement;
	isLoading?: boolean;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	_disabled?: RestyleButtonProps & { _dark?: RestyleButtonProps };
	_dark?: RestyleButtonProps;
	_light?: RestyleButtonProps;
};

const variant = createVariant({
	themeKey: 'buttonVariants',
});

const restyleFunctions = composeRestyleFunctions([
	color,
	typography,
	opacity,
	spacingShorthand,
	spacing,
	border,
	backgroundColorShorthand,
	backgroundColor,
	position,
	layout,
	//@ts-ignore temporaly fix ignore bad type issue
	variant,
]);

const spacingStyleProperties = spacing.map(({ property }) => property as string);
const textStyleProperties = [...color, ...typography].map(({ property }) => property as string);

const Button = forwardRef<ButtonProps, typeof Pressable>(
	(
		{
			children,
			spinner,
			isLoading,
			isDisabled = isLoading,
			isFullWidth,
			variant: buttonVariant = '',
			alignSelf = isFullWidth ? 'stretch' : 'flex-start',
			_disabled,
			_dark,
			_light,
			style,
			...rest
		},
		ref,
	) => {
		const disabledStyle = {
			backgroundColor: buttonVariant === 'solid' ? 'disabled' : undefined,
			opacity: buttonVariant !== 'solid' ? 0.5 : 1,
			..._disabled,
		};
		const props = useAppRestyle(restyleFunctions, {
			variant: buttonVariant,
			alignSelf,
			...(isDisabled && disabledStyle),
			...rest,
			..._light,
		});
		const fontStyle = useFontStyle(props.style[0] as TextStyle);
		const containerStyle = props.style[0];
		const nextContainerStyle: typeof containerStyle = {};

		const { textStyle, spacingStyle } = getKeys(containerStyle).reduce(
			(styleAcc, styleProperty) => {
				let isValidStyle = true;
				if (textStyleProperties.indexOf(styleProperty) !== -1) {
					styleAcc.textStyle[styleProperty] = containerStyle[styleProperty];
					isValidStyle = false;
				} else if (styleProperty.startsWith('margin') && spacingStyleProperties.indexOf(styleProperty) !== -1) {
					styleAcc.spacingStyle[styleProperty] = containerStyle[styleProperty];
					isValidStyle = false;
				} else if (styleProperty === 'borderRadius') {
					styleAcc.spacingStyle[styleProperty] = containerStyle[styleProperty];
				}
				if (isValidStyle) {
					nextContainerStyle[styleProperty] = containerStyle[styleProperty];
				}
				return styleAcc;
			},
			{ textStyle: {}, spacingStyle: {} } as Record<'textStyle' | 'spacingStyle', Record<string, any>>,
		);

		return (
			<View style={[styles.container, spacingStyle]} pointerEvents="box-none">
				<BaseButton
					{...props}
					ref={ref}
					style={[nextContainerStyle, style]}
					disabled={isDisabled}
					accessibilityState={{ disabled: isDisabled, busy: isLoading }}>
					{isLoading && (spinner || <BaseSpinner style={styles.spinner} color={textStyle.color} size="small" />)}
					<Text maxFontSizeMultiplier={1.3} style={[fontStyle, textStyle]}>
						{children}
					</Text>
				</BaseButton>
			</View>
		);
	},
);

Button.defaultProps = {
	variant: 'solid',
	isFullWidth: true,
};

export default React.memo(Button) as typeof Button;

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},
	spinner: {
		marginRight: 8,
	},
});
