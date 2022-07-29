import { atom } from "recoil";


export interface IUser {
  id: number;
  name: string;
  loginName: string;
  isSupper?: boolean;
  isDemo?: boolean;
}

export const loggedUserState = atom<IUser | undefined>({
  key: "loggedUserState",
  default: undefined,
});
