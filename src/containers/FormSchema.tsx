import React from "react";
import { FieldType, SchemaFormType } from "@types";
import { ViewStyle } from "react-native";
import { Box } from "@ui/components";
import ManagerInput from "@containers/ManagerInput";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

type Props = {
  dataFields: SchemaFormType;
  onSubmit?: (values: unknown) => void;
  onError?: () => void;
  styleContainerForm?: ViewStyle;
};

const FormSchema: React.FC<Props> = ({ dataFields }) => {
  type SCHEMA_FORM = Yup.InferType<typeof dataFields.form.schema>;

  const formikRef = React.createRef<FormikProps<SCHEMA_FORM>>();

  return (
    <Formik innerRef={formikRef}>
      <Box>
        <ManagerInput />
      </Box>
    </Formik>
  );
};

export default FormSchema;
