import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserStatus, signInAsync } from './authenticationSlice';
import { useForm } from "react-hook-form";
import { Submit, Loading, Form, FormInputLabel, Container } from '../../components';
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
      navigate("/", { replace: true });
    }
  }, [status, navigate])

  if (status === "loading" || status === "authenticated") {
    return <Loading />
  }


  return (
    <Container>
      <Form onSubmit={handleSubmit(onSignIn)}>
        <FormInputLabel
          label="Identifiant"
          type="text"
          autoComplete="username"
          {...register("username", { required: "Identifiant obligatoire" })}
          error={errors.username?.message}
        />
        <FormInputLabel
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "Mot de passe obligatoire" })}
          error={errors.password?.message}
        />
        <Submit value="Se connecter" />
      </Form>
    </Container>
  )
}