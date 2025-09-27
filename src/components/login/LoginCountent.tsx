"use client";

import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setToast } from "@/utils/setToast";
import FormHelperText from "@mui/material/FormHelperText";
import { dataValidator } from "@/utils/dataValidator";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showLoading } from "@/store/reducers/GlobalLoading";
import { DefaultForm } from "../DefaultForm";

export const LoginCountent = () => {
  const { login } = useAuth();
  const nextRouter = useRouter();
  const dispatch = useDispatch();
  const { emailValidator, passwordValidator } = dataValidator();
  const { errorToast, warningToast, successToast } = setToast();
  const [loginLoading, setloginLoading] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    valid: true,
    helperText: "",
  });
  const [password, setPassword] = useState({
    value: "",
    show: false,
    valid: true,
    helperText: "",
  });

  const handelSetEmail = (userEmail: string) => {
    const valid = emailValidator(userEmail);

    setEmail({
      valid: valid,
      value: userEmail,
      helperText: valid ? "" : "E-mail inválido!",
    });
  };

  const handelSetPassword = (userPassword: string) => {
    const valid = passwordValidator(userPassword);

    setPassword((prev) => ({
      ...prev,
      valid: valid,
      value: userPassword,
      helperText: valid ? "" : "Senha inválida!",
    }));
  };

  const handleClickShowPassword = () => {
    setPassword((prev) => ({
      ...prev,
      show: !password.show,
    }));
  };

  const hundleLogin = async () => {
    try {
      setloginLoading(true);

      const response = await login({
        userEmail: email.value,
        userPassword: password.value,
      });

      const userToken = response?.data?.accessToken;

      if (userToken) {
        sessionStorage.setItem(
          "PfpO7Rj_eTDF8pEdvZsHS0f9GIeV0iq-Ijug-WWAnsc",
          userToken
        );

        // REDIRECT
        successToast("OK");
      }
    } catch (error: any) {
      const errorStatus = error.status;

      if (errorStatus == 403 || errorStatus == 401) {
        setEmail((prev) => ({
          ...prev,
          valid: false,
        }));

        setPassword((prev) => ({
          ...prev,
          valid: false,
        }));

        warningToast("Usuário ou senha incorretos!");
      } else {
        errorToast("Erro ao fazer login!");
      }
    } finally {
      setloginLoading(false);
    }
  };

  const verifyLoginData = async () => {
    const validEmail = emailValidator(email.value);
    const validPassword = passwordValidator(password.value);

    if (validEmail && validPassword) {
      hundleLogin();
    } else {
      setEmail((prev) => ({
        ...prev,
        valid: validEmail,
      }));

      setPassword((prev) => ({
        ...prev,
        valid: validPassword,
      }));

      warningToast("Usuário ou senha inválidos!");
    }
  };

  const handleRegisterRedirect = () => {
    dispatch(showLoading());
    nextRouter.push("/register");
  };

  return (
    <DefaultForm
      headerTitle={
        <>
          Bem vindo ao <span className="text-blue-600">Loggable!</span>
        </>
      }
      submitFunction={verifyLoginData}
      submitText="Login"
      subRedirectFunction={handleRegisterRedirect}
      subRedirectText="Não sou cadastrado"
      loginLoading={loginLoading}
    >
      <li>
        <TextField
          className="w-80"
          type="email"
          id="user-login-email"
          label="E-mail"
          variant="standard"
          helperText={email.helperText}
          error={!email.valid}
          onChange={(e) => handelSetEmail(e.target.value)}
        />
      </li>

      <li className="mb-8">
        <FormControl variant="standard">
          <InputLabel
            htmlFor="user-login-password"
            style={{
              color: `${password.valid ? "" : "#d32f2f"}`,
            }}
          >
            Password
          </InputLabel>
          <Input
            id="user-login-password"
            type={password.show ? "text" : "password"}
            className="w-80"
            onChange={(e) => handelSetPassword(e.target.value)}
            error={!password.valid}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    password.show ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                >
                  {password.show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!password.valid && (
            <FormHelperText error={!password.valid}>
              {password.helperText}
            </FormHelperText>
          )}
        </FormControl>
      </li>
    </DefaultForm>
  );
};
