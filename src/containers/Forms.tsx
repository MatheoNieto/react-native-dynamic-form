import React from "react";
import { CommonProps, FieldType, SchemaFormType } from "@types";
import { createSchemasForms } from "@utils/createSchemaForms";
import { Box, ScrollBox } from "@ui/components";
import FormSchema from "@containers/FormSchema";
import BaseSpinner from "@ui/components/BaseSpinner";

type Props = CommonProps & {
  schemaFields: FieldType[];
};
const Forms: React.FC<Props> = ({ schemaFields, ...rest }) => {
  const [dataFields, setDataFields] = React.useState<SchemaFormType>();

  React.useEffect(() => {
    const schemaResult = createSchemasForms(schemaFields);
    setDataFields(schemaResult);
  }, [schemaFields]);

  if (!dataFields) {
    return <BaseSpinner />;
  }

  return (
    <ScrollBox>
      <Box px="m">
        <FormSchema {...rest} dataFields={dataFields} />
      </Box>
    </ScrollBox>
  );
};
export default Forms;
