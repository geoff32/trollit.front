import { User } from "./models";

// A mock function to mimic making an async request for data
export function fetchSignIn(user: { username: string, password: string }) {
  return new Promise<{ user: User }>((resolve) =>
    setTimeout(() => resolve({ user: { username: user.username, troll: { id: 1, name: "Jàïmérÿ" } } }), 500)
  );
}

// A mock function to mimic making an async request for data
export function fetchValidate() {
  return new Promise<{ user: User }>((resolve) =>
    setTimeout(() => resolve({ user: { username: "bob-Le-troll", troll: { id: 48303, name: "bob-Le-troll" } } }), 500)
  );
}

// A mock function to mimic making an async request for data
export function fetchSignOut() {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 500)
  );
}
