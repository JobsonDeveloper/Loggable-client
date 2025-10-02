import CircularProgress from "@mui/material/CircularProgress";
import { SimpleLink } from "./SimpleLink";
import { ReactNode } from "react";

type props = {
  headerTitle: ReactNode;
  children: ReactNode;
  submitFunction: () => void;
  submitText: string;
  subRedirectFunction: () => void;
  subRedirectText: string;
  loading: boolean;
  listClassName?: string
};

export const DefaultForm = ({
  headerTitle,
  children,
  submitFunction,
  submitText,
  subRedirectFunction,
  subRedirectText,
  loading,
  listClassName
}: props) => {
  return (
    <article className="flex flex-col gap-4 justify-between px-8 py-4">
      <header className="flex flex-col items-center justify-center justify-center w-80 h-16">
        <h2 className="font-bold text-[1.5rem] text-center">{headerTitle}</h2>
      </header>

      <ul className={`${listClassName} flex flex-col justify-center h-96`}>{children}</ul>

      <footer className="flex flex-col gap-4 items-center justify-center h-max">
        <button
          className={`${
            loading
              ? ""
              : "hover:shadow-none hover:bg-blue-600 cursor-pointer"
          } flex items-center justify-center bg-blue-500 w-full h-14 rounded-3xl outline-none shadow-lg text-gray-100 text-lg font-bold`}
          onClick={submitFunction}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size="30px" color="inherit" />
          ) : (
            <>{submitText}</>
          )}
        </button>
        <SimpleLink onClick={subRedirectFunction}>{subRedirectText}</SimpleLink>
      </footer>
    </article>
  );
};
