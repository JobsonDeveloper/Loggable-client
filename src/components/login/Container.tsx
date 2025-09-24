"use client";

import { Form } from "@/components/login/Form";
import { Wallpaper } from "@/components/login/Wallpaper";

export const Container = () => {
  return (
    <article className="max-h-[600px] flex gap-2 w-max overflow-hidden rounded-lg bg-white shadow-lg">
      <Wallpaper />
      <Form />
    </article>
  );
};
