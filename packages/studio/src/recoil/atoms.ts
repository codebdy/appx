import { atom } from "recoil";


export interface User {
  id: number;
  loginName: string;
  isSupper?: boolean;
  isDemo?: boolean;
}

export const loggedUserState = atom<User | undefined>({
  key: "loggedUserState",
  default: undefined,
});
