import React from "react";
import ThemeProvider from "@theme/ThemeProvider";
import Forms from "@containers/Forms";

export const DynamicForm = () => {
  return (
    <ThemeProvider>
      <Forms />
    </ThemeProvider>
  );
};
