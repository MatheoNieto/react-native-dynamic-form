import {TextStyle} from 'react-native';

import {getCustomFontFamily} from '@ui/utils';

function useFontStyle({
	                      fontFamily,
	                      fontWeight,
                      }: Pick<TextStyle, 'fontFamily' | 'fontWeight'>) {
	if (!fontFamily) {
		return null;
	}
	const customFontFamily = getCustomFontFamily(fontFamily, fontWeight);
	return {
		fontFamily: customFontFamily ?? fontFamily,
		fontWeight: customFontFamily ? null : fontWeight,
	};
}

export default useFontStyle;
