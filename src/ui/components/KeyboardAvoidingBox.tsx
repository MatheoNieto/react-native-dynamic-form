import * as React from 'react';
import {
	KeyboardAvoidingView,
	KeyboardAvoidingViewProps,
	Platform,
} from 'react-native';
import {BoxProps as RestyleBoxProps, createBox} from '@shopify/restyle';
import type {Theme} from '@theme';

export type KeyboardAvoidingBoxProps = React.PropsWithChildren<
	RestyleBoxProps<Theme> & KeyboardAvoidingViewProps
>;

const KeyboardAvoidingBox = createBox<Theme, KeyboardAvoidingBoxProps>(
	KeyboardAvoidingView,
);

KeyboardAvoidingBox.defaultProps = {
	behavior: Platform.OS === 'ios' ? 'padding' : 'height',
};

export default KeyboardAvoidingBox;
