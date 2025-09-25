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
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { SimpleLink } from "../SimpleLink";

export const Form = () => {
  const { login } = useAuth();
  const nextRouter = useRouter();
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
    nextRouter.push("/register");
  };

  return (
    <article className="flex flex-col justify-between px-8 py-4">
      <header className="flex flex-col items-center justify-center justify-center w-80 h-32">
        <h2 className="font-bold text-[1.5rem] text-center">
          Bem vindo ao <span className="text-blue-600">Loggable!</span>
        </h2>
      </header>

      <ul className="flex flex-col pb-16 pt-8 md:pb-0 md:pt-16 gap-8 flex-1">
        <li>
          <TextField
            className="w-80"
            type="email"
            id="standard-basic"
            label="E-mail"
            variant="standard"
            helperText={email.helperText}
            error={!email.valid}
            onChange={(e) => handelSetEmail(e.target.value)}
          />
        </li>

        <li>
          <FormControl variant="standard">
            <InputLabel
              htmlFor="standard-adornment-password"
              style={{
                color: `${password.valid ? "" : "#d32f2f"}`,
              }}
            >
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={password.show ? "text" : "password"}
              className="w-80"
              onChange={(e) => handelSetPassword(e.target.value)}
              error={!password.valid}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      password.show
                        ? "hide the password"
                        : "display the password"
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
      </ul>

      <footer className="flex flex-col gap-4 items-center justify-center h-32">
        <button
          className={`${
            loginLoading
              ? ""
              : "hover:shadow-none hover:bg-blue-600 cursor-pointer"
          } flex items-center justify-center bg-blue-500 w-full h-14 rounded-3xl outline-none shadow-lg text-gray-100 text-lg font-bold`}
          onClick={verifyLoginData}
          disabled={loginLoading}
        >
          {loginLoading ? (
            <CircularProgress size="30px" color="inherit" />
          ) : (
            <>Login</>
          )}
        </button>
        <SimpleLink onClick={handleRegisterRedirect}>
          Não sou cadastrado
        </SimpleLink>
      </footer>
    </article>
  );
};
