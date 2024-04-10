import { createTheme } from "@shopify/restyle";

import { palette } from "@theme/constants";
import {
  buttonVariants,
  cardVariants,
  dividerVariants,
  inputVariants,
  textVariants,
} from "@theme/variants";

const theme = createTheme({
  colors: {
    base0: palette.base0,
    base25: palette.base25,
    base50: palette.base50,
    base100: palette.base100,
    base200: palette.base200,
    base300: palette.base300,
    base400: palette.base400,
    base500: palette.base500,
    base700: palette.base700,
    base800: palette.base800,
    base900: palette.base900,
    success100: palette.success100,
    success700: palette.success700,
    bodyDrop: palette.blackAlpha500,
    navDrop: palette.blackAlpha250,
    black: palette.base900,
    white: palette.base0,
    transparent: palette.transparent,
    primary100: palette.primary100,
    primary900: palette.primary900,
    orange: palette.error400,
    bodyOverlay: palette.bodyOverlay,
    charlotte: palette.charlotte,
    error500: palette.error500,
    grayIcon: palette.grayIcon,
  },
  spacing: {
    //@ts-ignore allow unset props
    unset: null as number,
    "1px": 1,
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
    "4xl": 96,
    "5xl": 128,
    "6xl": 256,
  },
  borderRadii: {
    //@ts-ignore allow unset props
    unset: null as number,
    "1px": 1,
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
    "4xl": 96,
    "5xl": 128,
    "6xl": 256,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  zIndices: {},
  textVariants: textVariants,
  buttonVariants: buttonVariants,
  inputVariants: inputVariants,
  dividerVariants: dividerVariants,
  cardVariants: cardVariants,
});

export type ThemeCore = typeof theme;

export default theme;
