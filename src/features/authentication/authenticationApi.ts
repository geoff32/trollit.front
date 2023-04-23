import { User } from "./models";
import axios from 'axios';

export async function fetchSignIn(user: { userName: string, password: string }) {
  var result = await axios.post("/api/account/signin", user);

  return { user: result.data } as { user: User };
}

export async function fetchValidate() {
  var result = await axios.post("/api/account/validate");

  return { user: result.data } as { user: User };
}

export async function fetchSignOut() {
  await axios.post("/api/account/signout");
}
