import React from "react";
import Signature, {
  SignatureViewProps,
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Image, Modal, StyleSheet } from "react-native";
import { BaseTouchable, Box, Button, IconButton, Text } from "@ui/components";
import { Ionicons } from "@expo/vector-icons";

type Props = SignatureViewProps & {
  showPreview?: boolean;
  label?: string;
  isRequired?: boolean;
  ButtonsFooter?: any;
  onOpenCloseSign: (value: boolean) => void;
  showModalSign: boolean;
  signatureData?: string;
};
const SignatureComponent = React.forwardRef<SignatureViewRef, Props>(
  (
    {
      onOK,
      isRequired,
      label,
      ButtonsFooter,
      onOpenCloseSign,
      showModalSign,
      signatureData,
      showPreview = true,
      ...rest
    },
    ref,
  ) => {
    const renderPreviewOrButton = () => {
      if (!showPreview) {
        return (
          <Box style={{ marginTop: -30 }}>
            <Text variant="label" numberOfLines={1}>
              {label}
              {isRequired && <Text color="error500">*</Text>}
            </Text>

            <Button variant="link" onPress={() => onOpenCloseSign?.(true)}>
              {!signatureData ? "Signature" : "Update Signature"}
            </Button>
          </Box>
        );
      }

      return (
        <>
          {!signatureData ? (
            <BaseTouchable
              onPress={() => onOpenCloseSign?.(true)}
              style={styles.contentSign}
            >
              <></>
            </BaseTouchable>
          ) : (
            <>
              <Image
                resizeMode="stretch"
                source={{ uri: signatureData }}
                style={{ height: 150, backgroundColor: "white" }}
              />
              <Box style={{ alignItems: "flex-end" }}>
                <Button mt="xxs" onPress={() => onOpenCloseSign(true)}>
                  Resign
                </Button>
              </Box>
            </>
          )}
        </>
      );
    };

    return (
      <>
        {renderPreviewOrButton()}
        {showModalSign && (
          <Modal>
            <Box style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
              <Box
                style={{
                  top: "25%",
                  flex: 0.5,
                  backgroundColor: "white",
                  borderRadius: 15,
                  padding: 15,
                }}
              >
                {!isRequired && (
                  <Box
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <IconButton
                      onPress={() => onOpenCloseSign(false)}
                      icon={
                        <Ionicons
                          name="close-circle-outline"
                          size={35}
                          color="black"
                        />
                      }
                    />
                  </Box>
                )}
                <Signature
                  ref={ref}
                  onOK={onOK}
                  {...rest}
                  style={{
                    height: 200,
                    width: "100%",
                  }}
                />
                {ButtonsFooter}
              </Box>
            </Box>
          </Modal>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  contentUser: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  contentSign: {
    backgroundColor: "white",
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignatureComponent;
