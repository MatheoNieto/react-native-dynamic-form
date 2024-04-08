import React from 'react';
import {
	ActivityIndicator,
	ActivityIndicatorProps,
	Platform,
} from 'react-native';

type ActivityIndicatorSizes = NonNullable<ActivityIndicatorProps['size']>;

const SIZES: Record<ActivityIndicatorSizes, any> = {
	small: Platform.select<string | number>({android: 28, default: 'small'}),
	large: 'large',
};

const BaseSpinner: React.FC<BaseSpinnerProps> = ({size, ...props}) => (
	<ActivityIndicator {...props} size={SIZES[size as any] || size} />
);

export type BaseSpinnerProps = ActivityIndicatorProps;
export default BaseSpinner;
