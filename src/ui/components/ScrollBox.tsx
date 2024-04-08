import React from 'react';
import {
	Animated,
	ScrollView,
	ScrollViewProps,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';
import {
	BoxProps as ShopifyRestyleBoxProps,
	boxRestyleFunctions,
	composeRestyleFunctions,
} from '@shopify/restyle';
import {useAppRestyle} from '@theme';

import {useAsProp} from '@ui/hooks';
import {forwardRef} from '@ui/utils';

import type {Theme} from '@theme';

type RestyleBoxProps = ShopifyRestyleBoxProps<Theme> & {
	style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

type EdgeType = 'top' | 'bottom' | 'left' | 'right';

type Props = ScrollViewProps &
	RestyleBoxProps & {
	_light?: RestyleBoxProps;
	enableOnAndroid?: boolean;
	edges?: EdgeType[];
};
const restyleFunctions = composeRestyleFunctions(boxRestyleFunctions);

const ScrollBox = forwardRef<Props, typeof ScrollView>(
	({as, _light, ...rest}, ref) => {
		const ScrollBoxComponent = useAsProp(ScrollView, as);
		const props = useAppRestyle(restyleFunctions, {...rest, ..._light});

		return <ScrollBoxComponent ref={ref}  {...props} />;
	},
);

export type ScrollBoxProps = React.ComponentProps<typeof ScrollBox>;
export default ScrollBox;

const styles = StyleSheet.create({
	body: {
		flexGrow: 1,
	},
});

ScrollBox.defaultProps = {
	contentContainerStyle: styles.body,
};
