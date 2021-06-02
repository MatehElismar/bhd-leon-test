import { createReducer, on } from "@ngrx/store";
import * as authActions from "./auth.actions";

const stringifiedLocalCredentials = localStorage.getItem("credentials");
let localCredentials = null;
if (stringifiedLocalCredentials) {
  localCredentials = JSON.parse(stringifiedLocalCredentials);
} 

const initialState: authActions.AuthState = {
  credentials: {
    access_token: localCredentials ? localCredentials.access_token : "",
    refresh_token: localCredentials ? localCredentials.refresh_token : "",
  },
  profile: {
    lastName: "",
    name: "",
    photo: "",
  },
};
const authReducer = createReducer(
  initialState,
  on(authActions.setCredentials, (state, { credentials }) => {
    if (credentials.remember) {
      // TODO: Encrypt this.
      localStorage.setItem("credentials", JSON.stringify(credentials));
    }
    return { ...state, credentials };
  }),
  on(authActions.setUserData, (state, { profile }) => {
    return { ...state, profile };
  }),
  on(authActions.clearCredentials, () => {
    localStorage.removeItem('credentials')
    return { credentials: {}, profile: {} };
  })
);

export function reducer(state: authActions.AuthState | undefined, action: any) {
  return authReducer(state, action);
}
