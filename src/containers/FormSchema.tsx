import React from "react";
import { CommonProps, SchemaFormType, YupSchema } from "@types";
import { Box } from "@ui/components";
import ManagerInput from "@containers/ManagerInput";
import { Formik, FormikProps } from "formik";
import BaseSpinner from "@ui/components/BaseSpinner";

const FormSchema: React.FC<CommonProps & { dataFields: SchemaFormType }> = ({
  dataFields,
  onSubmit,
  labelButtonSubmit,
}) => {
  const formikRef = React.createRef<FormikProps<YupSchema>>();

  const [validationSchema, setValidationSchema] = React.useState<
    YupSchema | undefined
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

  const handleSubmit = React.useCallback((values: any) => {
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
