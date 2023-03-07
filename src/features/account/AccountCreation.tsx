import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Container, Form, FormInputLabel, Loading, Submit } from "../../components";
import { createAccountAsync, resetAccount, selectAccountStatus } from "./accountSlice";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { selectUserStatus } from "../authentication/authenticationSlice";

interface AccountCreationInput {
  username: string;
  password: string;
  confirmPassword: string;
  trollId: number;
  token: string;
}

export function AccountCreation() {
  const authenticationStatus = useAppSelector(selectUserStatus);
  const status = useAppSelector(selectAccountStatus);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AccountCreationInput>({
    mode: "onTouched",
    resolver: yupResolver(accountCreationFormat)
  });

  const onCreateAccount = async (account: AccountCreationInput) => {
    const { confirmPassword, ...createAccount } = account;
    await dispatch(createAccountAsync(createAccount));
    reset();
  }

  useEffect(() => {
    dispatch(resetAccount());
  }, [dispatch])

  if (authenticationStatus === "authenticated") {
    return <Navigate to="/" />
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onCreateAccount)}>
        <FormInputLabel
          id="username"
          label="Identifiant"
          type="text"
          autoComplete="username"
          {...register("username")}
          error={errors.username?.message}
        />
        <FormInputLabel
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />
        <FormInputLabel
          id="confirmPassword"
          label="Confirmation mot de passe"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <FormInputLabel
          id="trollId"
          label="N° troll"
          type="text"
          {...register("trollId")}
          error={errors.trollId?.message}
        />
        <FormInputLabel
          id="token"
          label="Mot de passe restreint"
          type="text"
          {...register("token")}
          error={errors.token?.message}
        />
        <Submit value="Créer son compte" />
      </Form>
    </Container>
  )
}

const accountCreationFormat = Yup.object().shape({
  username: Yup.string()
    .required("Identifiant obligatoire"),
  password: Yup.string()
    .required("Mot de passe obligatoire")
    .min(4, "Le mot de passe doit faire au moins 4 caractères")
    .max(20, "Le mot de passe ne doit pas faire plus de 20 caractères"),
  confirmPassword: Yup.string()
    .required("Confirmation du mot de passe obligatoire")
    .oneOf([Yup.ref("password")], "Mot de passe différent"),
  trollId: Yup.number()
    .typeError("N° troll doit être numérique")
    .integer("N° troll doit être numérique")
    .required("N° troll obligatoire"),
  token: Yup.string()
    .required("Mot de passe restreint obligatoire")
});

