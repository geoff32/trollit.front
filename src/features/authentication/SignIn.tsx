import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserStatus, signInAsync } from './authenticationSlice';
import { useForm } from "react-hook-form";
import { Form, FormInputLabel, Container, Button, Link } from '../../components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';

interface AuthenticationInput {
  userName: string;
  password: string;
}

export function SignIn() {
  const status = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<AuthenticationInput>({
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
  
  const isPending = isSubmitting || status === "loading";

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
          disabled={isPending}
        />
        <FormInputLabel
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "Mot de passe obligatoire" })}
          error={errors.password?.message}
          disabled={isPending}
        />
        <Button loading={isPending}>Se connecter</Button>
      </Form>
      <Link to="/account/create" disabled={isPending}>Créer un compte</Link>
    </Container>
  )
}

const authenticationFormat = Yup.object().shape({
  userName: Yup.string()
    .required("Identifiant obligatoire"),
  password: Yup.string()
    .required("Mot de passe obligatoire")
});