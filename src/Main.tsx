import React from "react";
import ThemeProvider from "@theme/ThemeProvider";
import Forms from "@containers/Forms";
import { CommonProps, FieldType } from "@types";

type Props = CommonProps & {
  schemaFields: FieldType[];
};

const DynamicForm: React.FC<Props> = ({ ...rest }) => {
  return (
    <ThemeProvider>
      <Forms {...rest} />
    </ThemeProvider>
  );
};

export default DynamicForm;
