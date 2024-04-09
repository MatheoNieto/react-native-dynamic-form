import * as React from "react";

import { FONT_WEIGHT_MAPPING } from "@theme/constants";

import type { FontWeight } from "@theme/types";
import type { As, ComponentWithAs, PropsOf, RightJoinProps } from "@ui/types";

export const createComponentWithAsProp = <
  Component extends As,
  Props extends React.ComponentProps<Component>,
>(
  BaseComponent: Component,
) =>
  React.forwardRef(({ as, ...rest }: { as: any }, ref) =>
    React.createElement(as || BaseComponent, { ref, ...rest }),
  ) as ComponentWithAs<Component, Props>;

export const forwardRef = <Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) => React.forwardRef(component);

export const getKeys = <T>(object: T) => Object.keys(object) as (keyof T)[];
