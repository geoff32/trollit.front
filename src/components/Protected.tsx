import React from "react";
import { Navigate } from "react-router-dom";
import { Loading } from ".";
import { useAppSelector } from "../app/hooks";
import { selectUserStatus } from "../features/authentication/authenticationSlice";

export function Protected({ children }: { children: React.ReactElement}) {
  const status = useAppSelector(selectUserStatus);
  if (status === "loading") {
    return <Loading />
  }
  if (status !== "authenticated") {
   return <Navigate to="/signin" />
  }

  return children;
}