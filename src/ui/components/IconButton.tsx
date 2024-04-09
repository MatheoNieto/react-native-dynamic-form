import * as React from 'react';
import {Pressable} from 'react-native';

import {forwardRef} from '@ui/utils';

import BaseTouchable from './BaseTouchable';

type Props = {
	icon: React.ReactElement | React.ReactNode;
	children?: React.ReactNode;
	isDisabled?: boolean;
	mt?:
		| 'unset'
		| '1px'
		| 'xxs'
		| 'xs'
		| 's'
		| 'm'
		| 'l'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
	ml?:
		| 'unset'
		| '1px'
		| 'xxs'
		| 'xs'
		| 's'
		| 'm'
		| 'l'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl';
	p?:
		| 'unset'
		| '1px'
		| 'xxs'
		| 'xs'
		| 's'
		| 'm'
		| 'l'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl';
	width?: number;
	height?: number;
};

const IconButton = forwardRef<Props, typeof Pressable>(
	({icon, ...rest}, ref) => (
		<BaseTouchable ref={ref} {...rest} accessibilityRole="button" borderless>
			{icon}
		</BaseTouchable>
	),
);

export type IconButtonProps = React.ComponentProps<typeof IconButton>;
export default IconButton;
