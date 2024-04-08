import * as React from "react";

import { Text, TextProps } from "@ui/components";

type Props = TextProps & { children?: React.ReactText };

const ErrorMessage = ({ children: erroMessage, ...rest }: Props) => (
  <Text variant="bodyFooter" color="errorAlert" ml="m" mt="xs" {...rest}>
    {typeof erroMessage === "string" ? erroMessage : ""}
  </Text>
);

export default ErrorMessage;
