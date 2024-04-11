const inputVariants = {
  defaults: {
    fontWeight: "300",
    fontSize: 16,
    color: "textPrimary",
    backgroundColor: "input",
    paddingHorizontal: "m",
    height: 60,
    borderRadius: "s",
    borderWidth: 1,
    borderColor: "inputBorder",
  },
  underLine: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "inputBorder",
  },
  focusedUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: "inputBorderFocused",
    fontWeight: "700",
  },
  error: {
    borderColor: "errorAlert",
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: "inputDisabled",
  },
  small: {
    backgroundColor: "transparent",
    color: "textPrimary",
    borderWidth: 0,
  },
  focused: {
    borderColor: "inputBorderFocused",
    fontWeight: "700",
  },
  textArea: {
    height: 120,
  },
  focusedArea: {
    borderColor: "inputBorderFocused",
    height: 120,
    fontWeight: "700",
  },
};

export default inputVariants;
