import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserStatus, signInAsync } from './authenticationSlice';
import { useForm } from "react-hook-form";
import { Input, Submit, Loading } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthenticationInput {
  username: string;
  password: string;
}

export function SignIn() {
  const status = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuthenticationInput>();
  const navigate = useNavigate();

  const onSignIn = async (user: AuthenticationInput) => {
    await dispatch(signInAsync(user));
    reset();
  }

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/");
    }
  }, [status, navigate])

  if (status === "loading" || status === "authenticated") {
    return <Loading />
  }

  return (
    <div>
      <FontAwesomeIcon icon={faUser} size="4x" />
      <form onSubmit={handleSubmit(onSignIn)}>
        <div><Input type="text" autoComplete="username" {...register("username", { required: true })} /></div>
        {errors.username && <span>L'identifiant est obligatoire</span>}
        <div><Input type="password" autoComplete="current-password" {...register("password", { required: true })} /></div>
        {errors.password && <span>Le mot de passe est obligatoire</span>}
        <Submit value="Se connecter" />
      </form>
    </div>
  )
}