import { CreateAccount, Account } from "./models";
import axios from 'axios';

export async function fetchCreateAccount(account: CreateAccount) {
  var result = await axios.post("/api/account", account);

  return { account: result.data } as { account: Account };
}

export async function fetchSignIn(user: { userName: string, password: string }) {
  var result = await axios.post("/api/signIn", user);

  return { account: result.data } as { account: Account };
}