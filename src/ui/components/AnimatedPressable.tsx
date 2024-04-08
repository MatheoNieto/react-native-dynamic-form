import * as React from 'react';
import {Animated, Pressable} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default AnimatedPressable;
export type AnimatePressableProps = React.ComponentProps<
	typeof AnimatedPressable
>;
