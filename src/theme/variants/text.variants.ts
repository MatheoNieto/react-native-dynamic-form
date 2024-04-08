import {CustomFonts} from '@theme/constants';

const textVariants = {
	defaults: {
		color: 'textPrimary',
		fontFamily: CustomFonts.LibreFranklin,
		letterSpacing: 0.049, // 0.049 (fontSize 14) = 0.0035em
		fontSize: 14,
	},
	headerRegular: {
		fontWeight: '300',
		fontSize: 32,
		lineHeight: 40,
	},
	headerBold: {
		fontWeight: 'bold',
		fontSize: 32,
		lineHeight: 40,
	},
	headerExtraBold: {
		fontWeight: '800',
		fontSize: 32,
		lineHeight: 40,
	},
	subheadLargeLight: {
		fontWeight: '300',
		fontSize: 24,
		lineHeight: 32,
	},
	subheadLight: {
		fontWeight: '300',
		fontSize: 16,
		lineHeight: 20,
	},
	subheadSecondary: {
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 16,
	},
	subheadMedium: {
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 20,
	},
	subheadLargeBold: {
		fontWeight: 'bold',
		fontSize: 24,
		lineHeight: 32,
	},
	subheadMediumLink: {
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 20,
		textDecorationLine: 'underline',
		color: 'primary',
	},
	subheadBold: {
		fontWeight: '800',
		fontSize: 20,
		lineHeight: 20,
	},
	bodyRegular: {
		fontWeight: 'normal',
		fontSize: 14,
		lineHeight: 18,
	},
	bodyRegularLabel: {
		fontWeight: 'normal',
		fontSize: 10,
		lineHeight: 18,
		color: 'textPrimary',
	},
	bodySmallRegular: {
		fontSize: 11,
		lineHeight: 18,
		color: 'lightGray',
	},
	bodyLabelTextfield: {
		fontWeight: 'normal',
		fontSize: 12,
		lineHeight: 18,
		color: 'textSecondary',
	},
	bodyBold: {
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 18,
	},
	bodyMediumLink: {
		fontSize: 14,
		lineHeight: 18,
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		color: 'black',
	},
	bodyNumberBlack: {
		fontWeight: '900',
		fontSize: 14,
		lineHeight: 18,
		color: 'secondary',
	},
	linkTextSmall: {
		fontSize: 10,
		color: 'primary',
		fontWeight: '500',
		textDecorationLine: 'underline',
	},
	bodyButtonBold: {
		fontWeight: '600',
		fontSize: 17,
		lineHeight: 21,
	},
	bodyFooter: {
		fontWeight: '500',
		fontSize: 8,
		lineHeight: 14,
		textTransform: 'uppercase',
	},
	bodyFooterBold: {
		fontWeight: 'bold',
		fontSize: 8,
		lineHeight: 18,
		textTransform: 'uppercase',
	},
	numeralBig: {
		fontWeight: '900',
		fontSize: 48,
		// !NOTE: not add lineHeight
		// lineHeight: 57,
		textTransform: 'uppercase',
		color: 'secondary',
	},
	numeralSmall: {
		fontWeight: '900',
		fontSize: 24,
		// !NOTE: not add lineHeight
		//lineHeight: 28,
		textTransform: 'uppercase',
		color: 'secondary',
	},
	signature: {
		fontFamily: 'Hellodilo',
		fontSize: 28,
		fontWeight: '400',
		lineHeight: 32,
		color: 'secondary',
	},
	inputLabel: {
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 14,
		color: 'textSecondary',
	},
	inputError: {
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 15,
		color: 'errorAlert',
	},
	// ALREADY MODIFIED AND IN USE
	subheadSmall: {
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 20,
	},
	subheadSmallBold: {
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 20,
	},
	lightGraySmallText: {
		fontWeight: '500',
		fontSize: 13,
		lineHeight: 16,
		color: 'lightGray'
	},
	menuEditor: {
		color: 'textGray',
		fontFamily: CustomFonts.LibreFranklin,
		letterSpacing: 0.049, // 0.049 (fontSize 14) = 0.0035em
		fontSize: 12,
	},
	typeJobActive: {
		color:"mustard",
		textDecorationLine:"underline",
		textDecorationColor:"mustard",
	},
	typeJob: {
		color:"textGray"
	}
};

export default textVariants;
