"use client";

import { Wallpaper } from "@/components/Wallpaper";
import { LoginCountent } from "@/components/login/LoginCountent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hideLoading } from "@/store/reducers/GlobalLoading";
import { RootReducer } from "@/store/store";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const { show } = useSelector((state: RootReducer) => state.globalLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, []);

  return (
    <>
      {show ? (
        <div className="fixed flex justify-center items-center w-full h-screen bg-white">
          <CircularProgress size="30px" color="primary" />
        </div>
      ) : (
        <section className="lg:p-4 bg-gray-50 h-screen flex items-center justify-center">
          <article className="h-max flex gap-2 w-max overflow-hidden rounded-lg bg-white shadow-lg">
            <Wallpaper />
            <LoginCountent />
          </article>
        </section>
      )}
    </>
  );
}
