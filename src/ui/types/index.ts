import * as React from 'react';

export type As<Props = any> = React.ElementType<Props>;

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
	as?: As;
};

export type OmitCommonProps<
	Target,
	OmitAdditionalProps extends keyof any = never,
> = Omit<Target, 'transition' | 'as' | 'color' | OmitAdditionalProps>;

export type RightJoinProps<
	SourceProps extends object = {},
	OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
	ComponentProps extends object,
	AsProps extends object,
	AdditionalProps extends object = {},
	AsComponent extends As = As,
> = RightJoinProps<ComponentProps, AdditionalProps> &
	RightJoinProps<AsProps, AdditionalProps> & {
	as?: AsComponent;
};

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
	<AsComponent extends As>(
		props: MergeWithAs<
			React.ComponentProps<Component>,
			React.ComponentProps<AsComponent>,
			Props,
			AsComponent
		>,
	): JSX.Element;

	displayName?: string;
	propTypes?: React.WeakValidationMap<any>;
	contextTypes?: React.ValidationMap<any>;
	defaultProps?: Partial<Props>;
	id?: string;
};

// export interface RestyleComponent<T extends As, P> extends ComponentWithAs<T, P> {}
