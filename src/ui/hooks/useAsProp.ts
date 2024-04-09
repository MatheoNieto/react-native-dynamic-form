import type {As, PropsOf} from '@ui/types';

function useAsProp<Component extends As>(
	component: Component,
	as: PropsOf<Component>['as'],
): Component {
	return (as || component) as Component;
}

export default useAsProp;
