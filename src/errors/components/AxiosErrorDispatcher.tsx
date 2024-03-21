import { resetAllError, setError } from "../errorSlice";
import { useAppDispatch } from "../../app/hooks";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { disauthenticate } from "../../features/authentication/authenticationSlice";

export default function AxiosErrorDispatcher() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetAllError());
  }, [dispatch, location]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {

      if (error instanceof AxiosError) {
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          if (error.response?.status === 400) {
            dispatch(setError(error.response?.data || { title: "Erreur", detail: "Une erreur s'est produite." }));
          }
          if (error.response?.status === 401) {
            dispatch(disauthenticate());
            dispatch(setError(error.response?.data || { title: "Non authentifié", detail: "Vous n'êtes pas authentifié. Merci de vous connecter." }));
          }
          if (error.response?.status === 403) {
            dispatch(setError({ title: "Accès refusé", detail: "Vous n'avez pas les autorisations nécessaires." }));
          }
        }
      }
      return Promise.reject(error);
    });

    return () => axios.interceptors.response.eject(interceptor);
  }, [dispatch])

  return <></>
}