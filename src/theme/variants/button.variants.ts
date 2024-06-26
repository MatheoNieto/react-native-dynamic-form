const buttonVariants = {
  defaults: {
    borderRadius: "s",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    px: "m",
    py: "s",
    minHeight: 50,
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.049, // 0.049 => 0.0035em (fontSize 14)
  },
  solid: {
    backgroundColor: "primaryBlue",
    color: "white",
  },
  link: {
    textDecorationLine: "underline",
    color: "primaryBlue",
  },
  text: {
    color: "primaryBlue",
  },
  solidWhite: {
    backgroundColor: "white",
    color: "primaryBlue",
  },
  outline: {
    backgroundColor: "input",
    color: "black",
    borderWidth: 1,
    borderColor: "buttonBorder",
  },
};

export default buttonVariants;
