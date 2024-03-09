import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, Container, Form, FormInputLabel, Loading } from "../../components";
import { createAccountAsync, resetAccount, selectAccount } from "./accountSlice";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { selectUserStatus } from "../authentication/authenticationSlice";
import { Navigate } from "react-router-dom";
import { Alert } from "reactstrap";

interface AccountCreationInput {
  userName: string;
  password: string;
  confirmPassword: string;
  trollId: number;
  token: string;
}

export function AccountCreation() {
  const authenticationStatus = useAppSelector(selectUserStatus);
  const { status, error } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<AccountCreationInput>({
    mode: "onTouched",
    resolver: yupResolver(accountCreationFormat)
  });

  const onCreateAccount = async (account: AccountCreationInput) => {
    const { confirmPassword, ...createAccount } = account;
    await dispatch(createAccountAsync(createAccount));
  }

  useEffect(() => {
    dispatch(resetAccount());
  }, [dispatch]);

  if (status === "created") {
    return <Navigate to="/dashboard" replace />
  }

  if (authenticationStatus === "authenticated") {
    return <span>Compte déjà existant!</span>
  }

  if (authenticationStatus === "loading") {
    return <Loading />
  }

  const isPending = isSubmitting || status === "submitting";

  return (
    <Container>
      {status === "failed" && <Alert color="danger">{error || "Une erreur s'est produite"}</Alert>}
      <Form onSubmit={handleSubmit(onCreateAccount)}>
        <FormInputLabel
          id="userName"
          label="Identifiant"
          type="text"
          autoComplete="username"
          {...register("userName")}
          error={errors.userName?.message}
          disabled={isPending}
        />
        <FormInputLabel
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
          disabled={isPending}
        />
        <FormInputLabel
          id="confirmPassword"
          label="Confirmation mot de passe"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          disabled={isPending}
        />
        <FormInputLabel
          id="trollId"
          label="N° troll"
          type="text"
          {...register("trollId")}
          error={errors.trollId?.message}
          disabled={isPending}
        />
        <FormInputLabel
          id="token"
          label="Mot de passe restreint"
          type="text"
          {...register("token")}
          error={errors.token?.message}
          disabled={isPending}
        />
        <Button loading={isPending}>Créer son compte</Button>
      </Form>
    </Container>
  )
}

const accountCreationFormat = Yup.object().shape({
  userName: Yup.string()
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

