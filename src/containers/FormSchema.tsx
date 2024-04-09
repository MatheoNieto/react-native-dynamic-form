import React from "react";
import { CommonProps, SchemaFormType } from "@types";
import { Box } from "@ui/components";
import ManagerInput from "@containers/ManagerInput";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import BaseSpinner from "@ui/components/BaseSpinner";

const FormSchema: React.FC<CommonProps & { dataFields: SchemaFormType }> = ({
  dataFields,
  onSubmit,
  labelButtonSubmit,
}) => {
  type SCHEMA_FORM = Yup.InferType<typeof dataFields.form.schema>;
  const formikRef = React.createRef<FormikProps<SCHEMA_FORM>>();

  const [validationSchema, setValidationSchema] = React.useState<
    SCHEMA_FORM | undefined
  >(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    setValidationSchema(dataFields.form.schema);
    const timeOutLoading = setTimeout(() => setIsLoading(false), 700);

    return () => {
      setValidationSchema(() => {
        setIsLoading(true);
        return undefined;
      });
      clearTimeout(timeOutLoading);
    };
  }, [dataFields.form.schema]);

  const handleSubmit = React.useCallback((values: SCHEMA_FORM) => {
    console.log("mapDataPetition::", JSON.stringify(values));
    onSubmit(values);
  }, []);

  if (!validationSchema || isLoading) {
    return <BaseSpinner />;
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={dataFields.form.initialValues}
      initialErrors={dataFields.form.initialErrors}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      <Box>
        <ManagerInput
          dataFields={dataFields}
          labelButtonSubmit={labelButtonSubmit}
        />
      </Box>
    </Formik>
  );
};

export default FormSchema;
