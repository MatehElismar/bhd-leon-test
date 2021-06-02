import { createAction, props } from "@ngrx/store";
import { Api } from "src/app/interfaces";

interface ICredentials extends Api.ICredentials{
  remember ?: boolean;
}
export interface AuthState {
  credentials: ICredentials;
  profile: Api.IUserData;
}

export const setCredentials = createAction("[Auth Service] Set Credentials", props<Partial<AuthState>>());
export const setUserData = createAction("[Auth Service] Set User Data", props<Partial<AuthState>>());
export const clearCredentials = createAction("[Auth Service] Sign Out");
