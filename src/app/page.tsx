"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Container } from "@/components/login/Container";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { LoggalgeAlert } from "@/components/alert/LoggalgeAlert";

const theme = createTheme({});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <section className="lg:p-4 bg-gray-50 h-screen flex items-center justify-center">
          <Container />
          <LoggalgeAlert />
        </section>
      </Provider>
    </ThemeProvider>
  );
}
