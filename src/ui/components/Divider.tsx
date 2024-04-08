import {
	createRestyleComponent,
	createVariant,
	VariantProps,
} from '@shopify/restyle';

import Box, { BoxProps } from './Box';

import type { Theme } from '@theme';

export type DividerProps = VariantProps<Theme, 'dividerVariants', 'variant'> &
	BoxProps;

const variant = createVariant<Theme>({ themeKey: 'dividerVariants' });

const Divider = createRestyleComponent<DividerProps, Theme>([variant], Box);

Divider.defaultProps = {
	variant: undefined, // NOTE: this fix defaults styles to the variant
};

export default Divider;
