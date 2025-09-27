"use client";

import { showLoading } from "@/store/reducers/GlobalLoading";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export const Wallpaper = () => {
  const nextRouter = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();

  function handleLoginRedirect() {
    if (path != "/login") {
      dispatch(showLoading());
      nextRouter.push("/login");
    }
  }

  return (
    <ul className="hidden bg-blue-400 h-[605px] w-80 relative md:block">
      <li className="absolute top-0 w-full p-2">
        <img
          src="/loggableLogo.png"
          alt="Loggable Logo"
          className="w-16 cursor-pointer"
          onClick={handleLoginRedirect}
        />
      </li>

      <li className="absolute bottom-5 w-full px-2 text-end text-white text-lg">
        &ldquo;Sempre prezando por sua autenticação com segurança&rdquo;
      </li>

      <li className="h-full">
        <img
          src="/wallpaperImage.png"
          alt="Wallpaper image"
          className="h-full object-cover"
        />
      </li>
    </ul>
  );
};
