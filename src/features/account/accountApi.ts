import { CreateAccount, Account } from "./models";
import axios from 'axios';

export async function fetchCreateAccount(account: CreateAccount) {
  const result = await axios.post<Account>("/api/account", account);

  return { account: result.data };
}

export async function fetchSignIn(user: { userName: string, password: string }) {
  const result = await axios.post<Account>("/api/signin", user);

  return { account: result.data };
}