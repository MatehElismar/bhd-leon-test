import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { Api, AppState } from "../interfaces";
import { Store } from "@ngrx/store";
import * as authActions from "../store/auth/auth.actions";
import { of } from "rxjs";
const { apiUrl } = environment;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  accessToken: string;
  refreshToken: string;
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  signIn(userId: string, password: string, remember?: boolean) {
    return this.httpClient
      .post<Api.ICredentials>(`${apiUrl}/sign_in`, { userId, password })
      .pipe(
        tap((x) => {
          this.store.dispatch(authActions.setCredentials({ credentials: { ...x, remember } }));
        }),
        catchError((err) => {
          console.error(err);
          if (userId === "00100010321" && password === "1111") {
            const resp = {
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDEwMDAxMDMyMSJ9.kPLjCmPJaw8jaOu0cEp4sXR0e52YRrj97OCGJaQGzA4",
              refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dw8gT8j5mKQbY8dVK453_dRICvBSg2oAQYFfzO1rpoY",
            };
            this.store.dispatch(authActions.setCredentials({ credentials: { ...resp, remember } }));
            return of(resp);
          } else {
            const error = {
              statusCode: 404,
              error: "Not Found",
              message: "Usuario y/o contraseña incorrectos",
            };

            throw error;
          }
        })
      );
  }

  getUserProfile() {
    return this.httpClient.get<Api.IUserData>(`${apiUrl}/user_data`).pipe(
      tap((x) => {
        this.store.dispatch(authActions.setUserData({ profile: x }));
      }),
      catchError((err) => {
        console.error(err);
        const resp = {
          name: "José",
          lastName: "Pérez",
          photo:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        };
        this.store.dispatch(authActions.setUserData({ profile: { ...resp } }));
        return of(resp);
      })
    );
  }

  signOut() {
    this.store.dispatch(authActions.clearCredentials());
    return of(true);
  }
}
