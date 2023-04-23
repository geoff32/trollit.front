import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserStatus, signInAsync } from './authenticationSlice';
import { useForm } from "react-hook-form";
import { Submit, Loading, Form, FormInputLabel, Container } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface AuthenticationInput {
  userName: string;
  password: string;
}

export function SignIn() {
  const status = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuthenticationInput>({
    mode: "onTouched",
    resolver: yupResolver(authenticationFormat)
  });

  const onSignIn = async (user: AuthenticationInput) => {
    await dispatch(signInAsync(user));
    reset();
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSignIn)}>
        <FormInputLabel
          id="userName"
          label="Identifiant"
          type="text"
          autoComplete="username"
          {...register("userName", { required: "Identifiant obligatoire" })}
          error={errors.userName?.message}
        />
        <FormInputLabel
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "Mot de passe obligatoire" })}
          error={errors.password?.message}
        />
        <Submit value="Se connecter" />
      </Form>
      <Link to="/account/create">Créer un compte</Link>
    </Container>
  )
}

const authenticationFormat = Yup.object().shape({
  userName: Yup.string()
    .required("Identifiant obligatoire"),
  password: Yup.string()
    .required("Mot de passe obligatoire")
});