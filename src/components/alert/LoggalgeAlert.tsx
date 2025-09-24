"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Alert from "@mui/material/Alert";
import { RootReducer } from "@/store/store";
import { hiddenAlert } from "@/store/reducers/Alert";

export const LoggalgeAlert = () => {
  const alertInfo = useSelector((state: RootReducer) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(hiddenAlert());
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="absolute right-0 h-12 bg-red-300 overflow-hidden bottom-0">
      <Alert
        variant="filled"
        severity={alertInfo.type}
        className={`${
          alertInfo.show ? "mt-0 transition-all animation-900" : "mt-15 transition-all animation-900"
        } `}
      >sdadasdasdas
        {alertInfo.text}
      </Alert>
    </div>
  );
};
