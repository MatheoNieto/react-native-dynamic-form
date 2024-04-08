import React from "react";
import { FieldType, SchemaFormType } from "@types";
import { createSchemasForms } from "@utils/createSchemaForms";
import { Box, ScrollBox } from "@ui/components";
import FormSchema from "@containers/FormSchema";
import BaseSpinner from "@ui/components/BaseSpinner";

type Props = {
  schemaFields: FieldType[];
};
const Forms: React.FC<Props> = ({ schemaFields }) => {
  const [dataFields, setDataFields] = React.useState<SchemaFormType>();

  React.useEffect(() => {
    const schemaFields = createSchemasForms(schemaFields);
    setDataFields(schemaFields);
  }, [schemaFields]);

  if (!dataFields) {
    return <BaseSpinner />;
  }

  return (
    <ScrollBox>
      <Box>
        <FormSchema dataFields={dataFields} />
      </Box>
    </ScrollBox>
  );
};
export default Forms;
