import React from 'react';
import {
	Animated,
	ColorValue,
	Easing,
	GestureResponderEvent,
	Platform,
	Pressable,
	PressableProps,
	StyleSheet,
	ViewProps,
} from 'react-native';
import color from 'color';

import {useAsProp} from '@ui/hooks';
import {forwardRef} from '@ui/utils';

export type BaseButtonProps = React.PropsWithChildren<
	Omit<PressableProps, 'style' | 'children'> &
	Pick<ViewProps, 'style'> & {
	enableHighlight?: boolean;
	activeOpacity?: number;
	underlayColor?: ColorValue;
	foreground?: boolean;
	borderless?: boolean;
}
>;

const BaseButton = forwardRef<BaseButtonProps, typeof Pressable>(
	(
		{
			disabled,
			children,
			enableHighlight,
			activeOpacity = 0.1,
			underlayColor,
			as,
			foreground,
			borderless = false,
			...rest
		},
		ref,
	) => {
		const PressableComponent = useAsProp(Pressable, as);
		const anim = React.useRef(new Animated.Value(0)).current;
		const isMounted = React.useRef(false);

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
			_setOpacityTo(activeOpacity, duration);
		};

		const _opacityInactive = (duration: number) => {
			_setOpacityTo(0, duration);
		};

		const onPressIn = (event: GestureResponderEvent) => {
			//@ts-ignore ignore bad type
			if (rest.onPressIn != null) {
				rest.onPressIn(event);
			}
		};

		const onPressOut = (event: GestureResponderEvent) => {
			_opacityInactive(170);
			if (rest.onPressOut != null) {
				rest.onPressOut(event);
			}
		};

		React.useEffect(() => {
			if (isMounted.current) {
				_opacityInactive(0);
			}
			isMounted.current = true;
		}, [disabled]);

		return (
			<PressableComponent
				ref={ref}
				disabled={disabled}
				accessibilityRole="button"
				android_ripple={
					Platform.OS === 'android'
						? {
							color: color(underlayColor)
								.alpha(activeOpacity as number)
								.string(),
							borderless,
							foreground,
						}
						: undefined
				}
				{...rest}
				onPressIn={onPressIn}
				onPressOut={onPressOut}>
				{children}
				{enableHighlight && (
					<Animated.View
						style={[
							StyleSheet.absoluteFillObject,
							{opacity: anim, backgroundColor: underlayColor},
						]}
						pointerEvents="none"
					/>
				)}
			</PressableComponent>
		);
	},
);

BaseButton.defaultProps = {
	enableHighlight: Platform.OS !== 'android',
	underlayColor: 'rgb(0,0,0)',
};

export default BaseButton;
