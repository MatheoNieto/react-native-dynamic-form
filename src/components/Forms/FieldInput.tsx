import React from 'react';
import {StyleSheet,} from "react-native";
import {FieldConfig, useField} from 'formik';
import ErrorMessage from './ErrorMessage';
import {TextInput} from '@components/TextInput';
import {TextInputProps} from "@components/TextInput/TextInput.types";
import {color} from "@theme/color";

export type Props = TextInputProps &
	Pick<FieldConfig<any>, 'name' | 'validate' | 'value'> & {
	label?: string;
	isClearButtonModeIcon?: 'while-editing' | 'never' | 'unless-editing' | 'always';
	isNumber?: boolean;
	defaultValue?: string
};

const FieldInput: React.FC<Props> = ({
	                                     name,
	                                     label,
	                                     defaultValue,
	                                     onBlur,
	                                     onChangeText,
	                                     isClearButtonModeIcon,
	                                     isNumber = true,
	                                     inputStyles = {},
	                                     labelStyles,
	                                     ...rest
                                     }) => {
	const [field, meta] = useField(name);
	const isInvalid = Boolean(meta.touched && meta.error);

	React.useEffect(() => {
		if (defaultValue === undefined || defaultValue === null) return;
		field.onChange(name)(defaultValue);
	}, [defaultValue])

	const handleChangeText = (text: string) => {
		onChangeText?.(text);
		field.onChange(name)(text);
	}

	return (
		<>
			<TextInput
				label={label}
				onChangeText={handleChangeText}
				defaultValue={defaultValue ?? meta.initialValue}
				value={field.value}
				clearButtonMode={isClearButtonModeIcon ?? 'while-editing'}
				labelStyles={StyleSheet.flatten([{color: color.button.primary}, labelStyles])}
				inputStyles={StyleSheet.flatten([{width: '100%'}, inputStyles])}
				{...rest}
			/>
			{isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
		</>
	);
}


export default FieldInput
