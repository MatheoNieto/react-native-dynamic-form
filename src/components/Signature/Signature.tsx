import React from "react";
import Signature, {
  SignatureViewProps,
  SignatureViewRef,
} from "react-native-signature-canvas";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, IconButton } from "@ui/components";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@assets/images";

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
          <View style={{ marginTop: -30 }}>
            <Text numberOfLines={1}>
              {label}
              {isRequired && <Text style={{ color: "red" }}>*</Text>}
            </Text>

            <Button variant="link" onPress={() => onOpenCloseSign?.(true)}>
              {!signatureData ? "Signature" : "Update Signature"}
            </Button>
          </View>
        );
      }

      return (
        <>
          {!signatureData ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => onOpenCloseSign?.(true)}
              style={styles.contentSign}
            >
              <></>
            </TouchableOpacity>
          ) : (
            <>
              <Image
                resizeMode="stretch"
                source={{ uri: signatureData }}
                style={{ height: 150, backgroundColor: "white" }}
              />
              <View style={{ alignItems: "flex-end" }}>
                <Button mt="xxs" onPress={() => onOpenCloseSign(true)}>
                  Resign
                </Button>
              </View>
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
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
              <View
                style={{
                  top: "25%",
                  flex: 0.5,
                  backgroundColor: "white",
                  borderRadius: 15,
                  padding: 15,
                }}
              >
                {!isRequired && (
                  <View
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
                  </View>
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
              </View>
            </View>
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
