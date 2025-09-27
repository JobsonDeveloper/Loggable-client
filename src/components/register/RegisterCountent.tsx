import TextField from "@mui/material/TextField";
import { DefaultForm } from "../DefaultForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showLoading } from "@/store/reducers/GlobalLoading";

export const RegisterCountent = () => {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const handleLoginRedirect = () => {
    dispatch(showLoading());
    nextRouter.push("/login");
  };

  return (
    <DefaultForm
      headerTitle={"Cadastro"}
      submitFunction={() => {}}
      submitText="Cadastrar"
      subRedirectFunction={handleLoginRedirect}
      subRedirectText="Já sou cadastrado"
      loginLoading={false}
    >
      <li>
        <TextField
          className="w-80"
          type="text"
          id="first-name"
          label="Nome"
          variant="standard"
          helperText={""}
          error={false}
          onChange={() => {}}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="text"
          id="last-name"
          label="Sobrenome"
          variant="standard"
          helperText={""}
          error={false}
          onChange={() => {}}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="email"
          id="user-email"
          label="E-mail"
          variant="standard"
          helperText={""}
          error={false}
          onChange={() => {}}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="password"
          id="user-password"
          label="Senha"
          variant="standard"
          helperText={""}
          error={false}
          onChange={() => {}}
        />
      </li>
      <li>
        <TextField
          className="w-80"
          type="password"
          id="user-confirm-password"
          label="Confirmação da senha"
          variant="standard"
          helperText={""}
          error={false}
          onChange={() => {}}
        />
      </li>
    </DefaultForm>
  );
};
