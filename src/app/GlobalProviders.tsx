"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import React, { ReactNode } from "react";

const theme = createTheme({});

type props = {
  children: ReactNode;
};

export const GlobalProviders = ({ children }: props) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
