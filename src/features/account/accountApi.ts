import { CreateAccount, Account } from "./models";

// A mock function to mimic making an async request for data
export function fetchCreateAccount(account: CreateAccount) {
  return new Promise<{ account: Account }>((resolve) =>
    setTimeout(() => resolve({ account: { username: account.username, troll: { id: account.trollId, name: "Troll" } } }), 500)
  );
}