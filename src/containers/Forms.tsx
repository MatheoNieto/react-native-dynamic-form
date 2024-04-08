import React from "react";
import { FieldCommonType } from "@types";

type Props = {
  schemaFields: FieldCommonType[];
  onSubmit?: (values: unknown) => void;
  onError?: () => void;
};

const Forms: React.FC<Props> = ({}) => {
  return <></>;
};

export default Forms;
