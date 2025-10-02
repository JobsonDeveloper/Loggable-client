"use client";

import React, { useEffect, useState } from "react";
import {
  SiAxios,
  SiDocker,
  SiEslint,
  SiGit,
  SiJunit5,
  SiMui,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiSpringsecurity,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { hideLoading, showLoading } from "@/store/reducers/GlobalLoading";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/hooks/auth";
import { setToast } from "@/utils/setToast";
import { setUser } from "@/store/reducers/User";
import User from "@/model/User";
import { RootReducer } from "@/store/store";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItem from "@mui/material/ListItem";

export default function Home() {
  const { errorToast } = setToast();
  const nextRouter = useRouter();
  const dispatch = useDispatch();
  const { getUser, logout, deleteUser } = useAuth();
  const {
    id: userId,
    firstName,
    lastName,
    role,
    userEmail,
  } = useSelector((state: RootReducer) => state.user);
  const { show } = useSelector((state: RootReducer) => state.globalLoading);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout();

      if (response.status === 200) {
        sessionStorage.removeItem(
          "PfpO7Rj_eTDF8pEdvZsHS0f9GIeV0iq-Ijug-WWAnsc"
        );

        dispatch(showLoading());
        nextRouter.push("/login");
      } else {
        throw new Error("Erro ao fazer logout, tente novamente.");
      }
    } catch (error) {
      setLoading(false);
      errorToast("Erro ao fazer logout, tente novamente.");
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await getUser();
      const newUser: User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        userEmail: response.data.email,
        userPassword: "",
        role: response.data.role,
      };

      dispatch(setUser(newUser));
      setShowHome(true);
    } catch (error) {
      errorToast("Erro ao validar usuário!");
      handleLogout();
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleDeleteUser = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteUser({ id: userId });

      if (response.status === 200) {
        sessionStorage.removeItem(
          "PfpO7Rj_eTDF8pEdvZsHS0f9GIeV0iq-Ijug-WWAnsc"
        );

        dispatch(showLoading());
        nextRouter.push("/login");
      }

      setDeleteLoading(false);
    } catch (error: any) {
      setDeleteLoading(false);

      if (error.status === 500) {
        errorToast("Não foi possível excluir a conta!");
      } else {
        errorToast(error.message);
      }
    }
  };

  useEffect(() => {
    dispatch(showLoading());
    const saveToken = sessionStorage.getItem(
      "PfpO7Rj_eTDF8pEdvZsHS0f9GIeV0iq-Ijug-WWAnsc"
    );

    if (saveToken) {
      handleGetUser();
    } else {
      nextRouter.push("/login");
    }
  }, []);

  return (
    <>
      {showHome ? (
        <section className="p-6 pb-16 max-w-5xl mx-auto space-y-8">
          {!show && (
            <>
              <div className="flex justify-end"></div>

              <header className="flex text-center justify-between relative">
                <h1 className="text-4xl font-bold w-full">Loggable</h1>

                <ul
                  className={`${
                    open ? "shadow-lg" : ""
                  } bg-white flex flex-col gap-2 text-start absolute right-0 w-56 rounded-lg`}
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <PersonRoundedIcon />
                    </ListItemIcon>
                    <div className="truncate">{`${firstName} ${lastName}`}</div>
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem className="text-sm">
                      <p className="pr-2">Email:</p>
                      <p className="text-gray-600 truncate">{userEmail}</p>
                    </ListItem>
                    <ListItem className="text-sm">
                      <p className="pr-2">Role:</p>
                      <p className="text-gray-600 truncate">{role}</p>
                    </ListItem>
                    <List component="div" disablePadding>
                      <ListItem sx={{ padding: 0 }}>
                        {role != "ADMIN" && (
                          <button
                            className="bg-[#ff6161] hover:bg-[#ed4c4c] cursor-pointer h-12 w-full text-white rounded-bl-lg"
                            onClick={handleDeleteUser}
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? (
                              <CircularProgress size="25px" color="error" />
                            ) : (
                              <>Excluir conta</>
                            )}
                          </button>
                        )}
                        <button
                          className={`${role === "ADMIN" ? "rounded-b-lg" : "rounded-br-lg" } bg-[#85a1ff] hover:bg-[#6b8dff] cursor-pointer h-12 w-full text-white`}
                          onClick={handleLogout}
                          disabled={loading}
                        >
                          {loading ? (
                            <CircularProgress size="25px" color="inherit" />
                          ) : (
                            <>Logout</>
                          )}
                        </button>
                      </ListItem>
                    </List>
                  </Collapse>
                </ul>
              </header>

              <article>
                <h2 className="text-2xl font-bold mb-4">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">
                  Aplicação focada na autenticação dos usuários, pois assim como
                  em todo sistema, a autenticação é um processo indispensável e
                  crucial. Através dela diminuímos exponencialmente o risco de
                  exposição de informações confidenciais da organização e os
                  dados sensíveis dos usuários.
                </p>
              </article>

              <article>
                <h2 className="text-2xl font-bold mb-4">
                  Front-End -{" "}
                  <a
                    href="https://github.com/JobsonDeveloper/Loggable-client"
                    className="text-blue-800 font-light"
                    target="_blank"
                  >
                    Visitar
                  </a>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Client para comunicação com o Loggable-API, fornecendo ao
                  usuário uma interface amigável e de fácil entendimento. O
                  usuário pode realizar cadastro, login e interagir com
                  feedbacks claros, garantindo segurança e boa experiência.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">
                  Pré-requisitos
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Node.js</li>
                  <li>pnpm, npm ou yarn</li>
                  <li>Git</li>
                  <li>Navegador moderno</li>
                  <li>IDE / Editor de código</li>
                </ul>
              </article>

              <article>
                <h2 className="text-2xl font-bold mb-4">
                  Back-End -{" "}
                  <a
                    href="https://github.com/JobsonDeveloper/Loggable-api"
                    className="text-blue-800 font-light"
                    target="_blank"
                  >
                    Visitar
                  </a>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  API para autenticação de usuários com dois tipos de contas:
                  <strong> ADMIN</strong> e <strong>BASIC</strong>. Usuários são
                  cadastrados com senha encriptada, e no login recebem ID e
                  token JWT para autenticação de futuras requisições.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">
                  Pré-requisitos
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Java 21+</li>
                  <li>Maven 3.9+</li>
                  <li>Docker</li>
                </ul>
              </article>

              <article>
                <h2 className="text-2xl font-bold py-8">
                  Tecnologias Utilizadas
                </h2>
                <ul className="flex flex-wrap gap-2 list-inside space-y-1 text-gray-700">
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiNextdotjs title="Next.js" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiReact title="React" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiTypescript title="TypeScript" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiRedux title="Redux" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiMui title="Material UI" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiTailwindcss title="Tailwind CSS" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiEslint title="ESLint" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiAxios title="Axios" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiGit title="Git" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <FaJava title="Java" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiSpringboot title="Spring Boot" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiSpringsecurity
                      title="Spring Security + JWT + OAuth2"
                      size={35}
                    />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiPostgresql title="PostgreSQL" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiDocker title="Docker" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiSwagger title="Swagger" size={35} />
                  </li>
                  <li className="p-1 rounded-lg shadow-lg w-11 h-11 bg-gray-200 hover:bg-blue-200 cursor-pointer">
                    <SiJunit5 title="JUnit" size={35} />
                  </li>
                </ul>
              </article>
            </>
          )}
        </section>
      ) : (
        <div className="fixed flex justify-center items-center w-full h-screen bg-white">
          <CircularProgress size="30px" color="primary" />
        </div>
      )}
    </>
  );
}
