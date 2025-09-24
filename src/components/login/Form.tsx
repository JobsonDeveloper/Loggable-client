"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { showAlert } from "@/store/reducers/Alert";
import { AlertTypes } from "@/constants/Enums";

export const Form = () => {
  const dispatch = useDispatch();
  const [inputsConfig, setInputsConfig] = useState({
    email: {
      value: "",
    },
    password: {
      value: "",
      show: false,
    },
  });

  const handleClickShowPassword = () => {
    setInputsConfig((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        show: !inputsConfig.password.show,
      },
    }));
  };

  const handelSetEmail = (email: string) => {
    setInputsConfig((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        value: email,
      },
    }));
  };

  const handelSetPassword = (password: string) => {
    setInputsConfig((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        value: password,
      },
    }));
  };

  const login = () => {
    const emailRegex = /^[^@]+@[^@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    const validEmail = emailRegex.test(inputsConfig.email.value);
    const validPassword = passwordRegex.test(inputsConfig.password.value);

    if (!validEmail || !validPassword) {
      dispatch(
        showAlert({
          text: "sucesso",
          type: AlertTypes.Success,
        })
      );
    }
  };

  return (
    <article className="flex flex-col justify-between px-8 py-4">
      <header className="flex flex-col items-center justify-center justify-center w-80 h-32">
        <h2 className="font-bold text-[1.5rem] text-center">
          Bem vindo ao <span className="text-blue-600">Loggagle!</span>
        </h2>
      </header>

      <ul className="flex flex-col pt-16 gap-8 flex-1">
        <li>
          <TextField
            className="w-80"
            id="standard-basic"
            label="E-mail"
            variant="standard"
            value={inputsConfig.email.value}
            onChange={(e) => handelSetEmail(e.target.value)}
          />
        </li>

        <li>
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={inputsConfig.password.show ? "text" : "password"}
              className="w-80"
              onChange={(e) => handelSetPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      inputsConfig.password.show
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                  >
                    {inputsConfig.password.show ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </li>
      </ul>

      <footer className="flex items-center justify-center h-32">
        <button
          className="bg-blue-500 w-full py-4 rounded-3xl shadow-lg cursor-pointer hover:shadow-none hover:bg-blue-600 text-gray-100 text-lg font-bold"
          onClick={login}
        >
          Login
        </button>
      </footer>
    </article>
  );
};
