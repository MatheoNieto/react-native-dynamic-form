import React from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import {
	BoxProps as ShopifyRestyleBoxProps,
	boxRestyleFunctions,
	composeRestyleFunctions,
} from '@shopify/restyle';
import { useAppRestyle } from '@theme';

import { useAsProp } from '@ui/hooks';
import { forwardRef } from '@ui/utils';

import type { Theme } from '@theme';
import type { Animation } from 'react-native-animatable';

type RestyleBoxProps = ShopifyRestyleBoxProps<Theme> & {
	style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

type Props = RestyleBoxProps & {
	_dark?: RestyleBoxProps;
	_light?: RestyleBoxProps;
	onPress?: (() => Promise<any> | void) | Function | null;
	disabled?: boolean;
	animation?:
		| Animation
		| Record<number, Record<string, Record<string, number>[]>>;
	value?: React.ReactElement | string;
	useNativeDriver?: boolean;
	duration?: number;
	isDisabled?: boolean | string;
	delay?: number;
	easing?: string;
	onLongPress?: (() => Promise<any> | void) | Function | null;
	to?: any;
	loanId?: string;
};
const restyleFunctions = composeRestyleFunctions(boxRestyleFunctions);

const Box = forwardRef<Props, typeof View>(
	({ as, _dark, _light, ...rest }, ref) => {
		const BoxComponent = useAsProp(View, as);
		const props = useAppRestyle(restyleFunctions, { ...rest, ..._light });

		return <BoxComponent ref={ref} {...props} />;
	},
);
export type BoxProps = React.ComponentProps<typeof Box>;
export default Box;
