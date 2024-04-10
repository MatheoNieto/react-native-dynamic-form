import React from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";
import { useCombinedRefs } from "@ui/hooks";

type Props = MaskInputProps & {
  onChangeText: (text: string) => void;
};

const MaskInputComponent = React.forwardRef<typeof TextInput, Props>(
  ({ value, onChangeText, onBlur, onFocus, ...restProps }, ref) => {
    const [currentValue, setCurrentValue] = React.useState<string>();
    const internalRef = React.createRef<TextInput>();
    const refs = useCombinedRefs(internalRef, ref);

    const handleBlur = React.useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(ev);
      },
      [],
    );

    const handleFocus = React.useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(ev);
      },
      [],
    );

    const handleChangeText = (text: string) => {
      setCurrentValue(text);
      onChangeText(text);
    };

    return (
      <View>
        <MaskInput
          ref={refs}
          value={value || currentValue}
          onChangeText={(text) => handleChangeText(text)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...restProps}
        />
      </View>
    );
  },
);
export default MaskInputComponent;
