import React from "react";
import { Keyboard, Pressable } from "react-native";

import { Box, BoxProps } from "@ui/components";

export default function DismissKeyboardPressable(props: BoxProps) {
  return (
    <Box
      as={Pressable}
      flex={1}
      onPress={Keyboard.dismiss}
      accessible={false}
      {...props}
    />
  );
}
