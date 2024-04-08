import type {FontWeight} from '@theme/types';

export enum CustomFonts {
	LibreFranklin = 'LibreFranklin',
}

export const FONT_WEIGHT_MAPPING: Record<FontWeight, string> = {
	'100': '-Thin',
	'200': '-ExtraLight',
	'300': '-Light',
	'400': '-Regular',
	'500': '-Medium',
	'600': '-SemiBold',
	'700': '-Bold',
	'800': '-ExtraBold',
	'900': '-Black',
	normal: '-Regular',
	bold: '-Bold',
};

export {default as palette} from '@theme/constants/palette';
