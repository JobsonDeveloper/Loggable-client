import { MouseEventHandler, ReactNode } from "react";

type props = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLSpanElement> | undefined
};

export const SimpleLink = ({ children, onClick }: props) => {
  return (
    <span className="text-blue-400 hover:text-blue-500 text-sm font-thin cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
