import axios from "@/lib/axios";
import User from "@/model/User";

export const useAuth = () => {
  const login = ({
    userEmail,
    userPassword,
  }: Pick<User, "userEmail" | "userPassword">) => {
    return axios.post("/api/auth/login", {
      email: userEmail,
      password: userPassword,
    });
  };

  const logout = () => {
    return axios.post("/api/auth/logout");
  };

  const register = (
    { firstName, lastName, userEmail, userPassword }: Omit<User, "id" | "role">,
    confirmPassword: string
  ) => {
    return axios.post("/api/auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: userEmail,
      password: userPassword,
      confirmPassword: confirmPassword,
    });
  };

  const deleteUser = ({ id }: Pick<User, "id">) => {
    return axios.delete(`/api/user/delete/${id}`);
  };

  const getUser = () => {
    return axios.get("/api/user/info");
  };

  return { login, register, getUser, logout, deleteUser };
};
