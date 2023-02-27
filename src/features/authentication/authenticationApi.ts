import { User } from "./models/User";

// A mock function to mimic making an async request for data
export function fetchSignIn(user: { username: string, password: string }) {
  return new Promise<{ user: User }>((resolve) =>
    setTimeout(() => resolve({ user: { username: user.username } }), 500)
  );
}

// A mock function to mimic making an async request for data
export function fetchSignOut() {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 500)
  );
}
  