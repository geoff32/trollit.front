import { User } from "./models";
import axios from 'axios';

export async function fetchSignIn(user: { userName: string, password: string }) {
  var result = await axios.post<User>("/api/account/signin", user);

  return { user: result.data };
}

export async function fetchValidate() {
  var result = await axios.post<User>("/api/account/validate");

  return { user: result.data };
}

export async function fetchSignOut() {
  await axios.post("/api/account/signout");
}
