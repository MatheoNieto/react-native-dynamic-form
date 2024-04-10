import React from "react";
import { FieldConfig, useField } from "formik";
import { View } from "react-native";
import ErrorMessage from "@components/Forms/ErrorMessage";
import SignatureComponent from "./Signature";
import {
  SignatureViewProps,
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Button } from "@ui/components";

type Props = SignatureViewProps &
  Pick<FieldConfig<any>, "name" | "validate" | "value"> & {
    isRequired: boolean;
    label?: string;
    onChange?: (value: string) => void;
    showPreview?: boolean;
  };

const FieldSignature: React.FC<Props> = ({
  label,
  name,
  validate,
  value,
  isRequired,
  onChange,
  showPreview = true,
}) => {
  const ref = React.createRef<SignatureViewRef>();
  const [field, meta] = useField({ name, validate, value, defaultValue: "" });
  const [signatureData, setSignatureData] = React.useState<string>();
  const [showModalSign, setShowModalSign] = React.useState(false);

  const isInvalid = Boolean(meta.touched && meta.error);
  const handleChange = React.useCallback((sign: string) => {
    onChange?.(sign);
    // @ts-ignore
    field.onChange(name)(sign);

    setTimeout(() => {
      setSignatureData(sign);
      setShowModalSign(false);
    }, 500);
  }, []);
  const handleUndo = () => {
    ref.current?.clearSignature();
  };
  const handleConfirm = () => {
    ref.current?.readSignature();
  };

  return (
    <>
      <SignatureComponent
        showPreview={showPreview}
        onOpenCloseSign={(showOrHide: boolean) => setShowModalSign(showOrHide)}
        showModalSign={showModalSign}
        ButtonsFooter={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button p="s" variant="text" onPress={handleUndo}>
              Clear
            </Button>
            <Button p="s" width={100} onPress={handleConfirm}>
              Confirm
            </Button>
          </View>
        }
        ref={ref}
        onOK={handleChange}
        label={label}
        isRequired={isRequired}
        webStyle={`.m-signature-pad--footer {display: none; margin: 0px;width: 100%,`}
        signatureData={signatureData}
      />
      {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};
export default FieldSignature;
