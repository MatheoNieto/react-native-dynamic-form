import React from "react";
import { FieldArray, FieldConfig, useField, useFormikContext } from "formik";

import FieldSignature from "@components/Signature";
import ErrorMessage from "@components/Forms/ErrorMessage";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FieldInput from "@components/Forms/FieldInput";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@ui/components";

type Props = Pick<FieldConfig<any>, "name" | "validate" | "value"> & {
  multiple?: boolean;
  label: string;
  required: boolean;
  disabledInput?: boolean;
  optionWhoSign?: string[];
};

const FieldsSignature: React.FC<Props> = ({
  label,
  name,
  validate,
  value,
  required,
  multiple,
  optionWhoSign,
  disabledInput,
}) => {
  const formik = useFormikContext();
  const { values } = formik;

  const [_, meta] = useField({ name, validate, value });
  const isInvalid = Boolean(meta.touched && meta.error);

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <>
          {values[name]?.map((_, index, arraysValues) => (
            <View key={`signature-${index}`} style={{ marginVertical: 10 }}>
              {multiple && arraysValues.length > 1 && (
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity onPress={() => arrayHelpers.remove(index)}>
                    <Ionicons name="trash-bin" size={25} color="#2D7AC3" />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.contentUser}>
                <FieldInput
                  placeholder="Enter name"
                  key={`field-input-signature-${index}`}
                  name={`${name}.${index}.name`}
                  label={label}
                  isRequired={required}
                  defaultValue={""}
                  containerStyles={styles.containerStyles}
                  contentInputStyles={styles.contentInputStyles}
                  isNumber={false}
                  editable={!disabledInput}
                />
              </View>
              <FieldSignature
                key={`signature-field-canvas-${index}`}
                name={`${name}.${index}.base64_image`}
                label={label}
                isRequired={required}
              />
              {isInvalid && (
                <ErrorMessage>
                  {meta?.error[index] && "The signature is a required field"}
                </ErrorMessage>
              )}
            </View>
          ))}
          {multiple && (
            <Button
              mb="m"
              onPress={() =>
                arrayHelpers.push({
                  name: "",
                  base64_image: "",
                })
              }
            >
              + Add another signature
            </Button>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentUser: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  contentSign: {
    backgroundColor: "white",
    height: 150,
    width: "100%",
  },
  contentInputStyles: {
    borderWidth: 0,
    borderBottomWidth: 1,
    marginVertical: 0,
  },
  containerStyles: {
    paddingTop: 5,
    paddingHorizontal: 5,
    marginVertical: 0,
  },
});

export default FieldsSignature;
