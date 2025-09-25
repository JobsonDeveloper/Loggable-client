import axios from "@/lib/axios";

type userCredentials = {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPassword: string;
  confirmPassword: string;
};

export const useAuth = () => {
  const login = ({
    userEmail,
    userPassword,
  }: Omit<userCredentials, "firstName" | "lastName" | "confirmPassword">) => {
    return axios.post("/api/user/login", {
      email: userEmail,
      password: userPassword,
    });
  };

  const register = ({
    firstName,
    lastName,
    userEmail,
    userPassword,
    confirmPassword,
  }: userCredentials) => {
    return axios.post("/api/user/register", {
      firstName: firstName,
      lastName: lastName,
      email: userEmail,
      password: userPassword,
      confirmPassword: confirmPassword,
    });
  };

  return { login, register };
};
