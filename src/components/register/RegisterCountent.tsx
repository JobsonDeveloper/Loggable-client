"use client";

import TextField from "@mui/material/TextField";
import { DefaultForm } from "../DefaultForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showLoading } from "@/store/reducers/GlobalLoading";
import { useState } from "react";
import { dataValidator } from "@/utils/dataValidator";
import { setToast } from "@/utils/setToast";
import { useAuth } from "@/hooks/auth";
import User from "@/model/User";

const defaultData = {
  value: "",
  error: true,
  helperText: " ",
};

export const RegisterCountent = () => {
  const { register } = useAuth();
  const { nameValidator, emailValidator, passwordValidator } = dataValidator();
  const nextRouter = useRouter();
  const dispatch = useDispatch();
  const [registerLoading, setRegisterLoading] = useState(false);
  const { errorToast, warningToast, successToast } = setToast();
  const [firstName, setFirstName] = useState(defaultData);
  const [lastName, setLastName] = useState(defaultData);
  const [email, setEmail] = useState(defaultData);
  const [password, setPassword] = useState(defaultData);
  const [confirmPassword, setConfirmPassword] = useState(defaultData);

  const handleSetFirstName = (userFirstName: string) => {
    const valid = nameValidator(userFirstName);

    setFirstName({
      value: userFirstName,
      error: valid,
      helperText: valid ? " " : "Nome inválido!",
    });
  };

  const handleSetLastName = (userLastName: string) => {
    const valid = nameValidator(userLastName);

    setLastName({
      value: userLastName,
      error: valid,
      helperText: valid ? " " : "Sobrenome inválido!",
    });
  };

  const handleSetEmail = (userEmail: string) => {
    const valid = emailValidator(userEmail);

    setEmail({
      value: userEmail,
      error: valid,
      helperText: valid ? " " : "E-mail inválido!",
    });
  };

  const handleSetPassword = (userPassword: string) => {
    const valid = passwordValidator(userPassword);

    setPassword({
      value: userPassword,
      error: valid,
      helperText: valid ? " " : "Senha inválida!",
    });
  };

  const handleSetConfirmPassword = (userConfirmPassword: string) => {
    const valid = passwordValidator(userConfirmPassword);
    const passwordsEquals = userConfirmPassword === password.value;

    setConfirmPassword({
      value: userConfirmPassword,
      error: valid && passwordsEquals,
      helperText: valid
        ? passwordsEquals
          ? " "
          : "As senhas precisam ser iguais!"
        : "Senha inválida!",
    });
  };

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);

      const response = await register(
        {
          firstName: firstName.value,
          lastName: lastName.value,
          userEmail: email.value,
          userPassword: password.value,
        },
        confirmPassword.value
      );

      const userToken = response?.data?.accessToken;

      if (userToken) {
        sessionStorage.setItem(
          "PfpO7Rj_eTDF8pEdvZsHS0f9GIeV0iq-Ijug-WWAnsc",
          userToken
        );

        nextRouter.push("/home");
      }
    } catch (error: any) {
      setRegisterLoading(false);

      if (error.status === 409) {
        errorToast("Este E-mail já está cadastrado!");
        setEmail((prev) => ({
          ...prev,
          error: false,
          helperText: "E-mail já cadastrado!",
        }));
      } else {
        errorToast("Erro ao cadastrar usuário!");
      }
    }
  };

  const verifyRegisterData = () => {
    const userFirstName = !firstName.error;
    const userLastName = !lastName.error;
    const userEmail = !email.error;
    const userPassword = !password.error;
    const userConfirmPassword = !confirmPassword.error;

    if (
      userFirstName ||
      userLastName ||
      userEmail ||
      userPassword ||
      userConfirmPassword
    ) {
      handleSetFirstName(firstName.value);
      handleSetLastName(lastName.value);
      handleSetEmail(email.value);
      handleSetPassword(password.value);
      handleSetConfirmPassword(confirmPassword.value);
      warningToast("Fromulário inválido!");
      return;
    }

    handleRegister();
  };

  const handleLoginRedirect = () => {
    dispatch(showLoading());
    nextRouter.push("/login");
  };

  return (
    <DefaultForm
      headerTitle={"Cadastro"}
      submitFunction={verifyRegisterData}
      submitText="Cadastrar"
      subRedirectFunction={handleLoginRedirect}
      subRedirectText="Já sou cadastrado"
      loading={registerLoading}
      listClassName="gap-2"
    >
      <li>
        <TextField
          className="w-80"
          type="text"
          id="first-name"
          label="Nome"
          variant="standard"
          helperText={firstName.helperText}
          error={!firstName.error}
          onChange={(e) => {
            handleSetFirstName(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? verifyRegisterData() : {})}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="text"
          id="last-name"
          label="Sobrenome"
          variant="standard"
          helperText={lastName.helperText}
          error={!lastName.error}
          onChange={(e) => {
            handleSetLastName(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? verifyRegisterData() : {})}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="email"
          id="user-email"
          label="E-mail"
          variant="standard"
          helperText={email.helperText}
          error={!email.error}
          onChange={(e) => {
            handleSetEmail(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? verifyRegisterData() : {})}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="password"
          id="user-password"
          label="Senha"
          variant="standard"
          helperText={password.helperText}
          error={!password.error}
          onChange={(e) => {
            handleSetPassword(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? verifyRegisterData() : {})}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="password"
          id="user-confirm-password"
          label="Confirmação da senha"
          variant="standard"
          helperText={confirmPassword.helperText}
          error={!confirmPassword.error}
          onChange={(e) => {
            handleSetConfirmPassword(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? verifyRegisterData() : {})}
        />
      </li>
    </DefaultForm>
  );
};
