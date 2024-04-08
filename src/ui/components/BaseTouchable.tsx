// @ts-nocheck
import * as React from 'react';
import {
	Animated,
	ColorValue,
	Easing,
	GestureResponderEvent,
	Platform,
	Pressable,
	PressableProps,
	StyleProp,
	ViewStyle,
} from 'react-native';
import {
	BoxProps,
	boxRestyleFunctions,
	composeRestyleFunctions,
} from '@shopify/restyle';
import { Theme, useAppRestyle } from '@theme';

import { useAsProp } from '@ui/hooks';
import { forwardRef } from '@ui/utils';

import AnimatedPressable from './AnimatedPressable';
import { useIsDarkMode } from "@theme/hooks";

type Props = BoxProps<Theme> & {
	children?: React.ReactElement | React.ReactNode | PressableProps['children'];
	_dark?: BoxProps<Theme>;
	_light?: BoxProps<Theme>;
	activeOpacity?: number;
	isDisabled?: boolean;
	style?: PressableProps['style'] | StyleProp<ViewStyle>;
	// only for Android
	rippleColor?: ColorValue;
	radius?: number;
	borderless?: boolean;
	foreground?: boolean;
};

const restyleFunctions = composeRestyleFunctions(boxRestyleFunctions);

const BaseTouchable = forwardRef<Props, typeof Pressable>(
	(
		{
			children,
			radius,
			isDisabled,
			rippleColor,
			borderless,
			activeOpacity,
			foreground,
			as,
			_dark,
			_light,
			...rest
		},
		ref,
	) => {
		const TouchableComponent = useAsProp(AnimatedPressable, as);
		const isDarkMode = useIsDarkMode();
		const props = useAppRestyle(restyleFunctions, {
			...rest,
			...(isDarkMode ? _dark : _light),
		});
		const childOpacity = props.style?.[0]?.opacity || 1;
		const anim = React.useRef(new Animated.Value(childOpacity)).current;
		const isMounted = React.useRef(false);
		/**
		 * Animate the touchable to a new opacity.
		 */
		const _setOpacityTo = (toValue: number, duration: number) => {
			if (Platform.OS === 'android') {
				return;
			}
			Animated.timing(anim, {
				toValue,
				duration,
				easing: Easing.inOut(Easing.quad),
				useNativeDriver: true,
			}).start();
		};

		const _opacityActive = (duration: number) => {
			_setOpacityTo(activeOpacity ?? 0.4, duration);
		};

		const _opacityInactive = (duration: number) => {
			_setOpacityTo(childOpacity, duration);
		};

		const onPressIn = (event: GestureResponderEvent) => {
			//@ts-ignore ignore bad type
			_opacityActive(
				event.dispatchConfig.registrationName === 'onResponderGrant' ? 0 : 150,
			);
			//@ts-ignore
			if (props.onPressIn != null) {
				//@ts-ignore
				props.onPressIn(event);
			}
		};

		const onPressOut = (event: GestureResponderEvent) => {
			_opacityInactive(170);
			// @ts-ignore
			if (props.onPressOut != null) {
				// @ts-ignore
				props.onPressOut(event);
			}
		};

		React.useEffect(() => {
			if (isMounted.current) {
				_opacityInactive(170);
			}
			isMounted.current = true;
		}, [isDisabled, childOpacity]);

		return (
			<TouchableComponent
				ref={ref}
				android_ripple={{
					color:
						rippleColor ||
						(isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
					borderless,
					radius,
					foreground,
				}}
				{...props}
				style={[props.style, Platform.OS !== 'android' && { opacity: anim }]}
				disabled={isDisabled}
				onPressIn={onPressIn}
				onPressOut={onPressOut}>
				{children}
			</TouchableComponent>
		);
	},
);

export type BaseTouchableProps = React.ComponentProps<typeof BaseTouchable>;

export default BaseTouchable;
