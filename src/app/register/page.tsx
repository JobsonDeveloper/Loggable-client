"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hideLoading } from "@/store/reducers/GlobalLoading";
import { Wallpaper } from "@/components/Wallpaper";
import { RegisterCountent } from "@/components/register/RegisterCountent";
import CircularProgress from "@mui/material/CircularProgress";
import { RootReducer } from "@/store/store";

export default function Register() {
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
          <article className="max-h-[600px] flex gap-2 w-max overflow-hidden rounded-lg bg-white shadow-lg">
            <Wallpaper />
            <RegisterCountent />
          </article>
        </section>
      )}
    </>
  );
}
