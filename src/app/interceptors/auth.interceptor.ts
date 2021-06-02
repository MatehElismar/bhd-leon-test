import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpEventType,
} from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import { Observable, EMPTY } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
// import { SubSink } from "subsink";
import { AlertController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { AppState } from "../interfaces";
import { SubSink } from "subsink";
const { apiUrl } = environment;

@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor, OnDestroy {
  headers: HttpHeaders;
  authorizationToken: string;
  subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router) {
    this.subs.sink = this.store.subscribe((state) => {
      this.authorizationToken = state.auth.credentials.access_token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only apply this code to the request that are sent to our own authenticated server
    const unauthenticatedRoutes = [`${apiUrl}/sign_in`];

    if (request.url.includes(apiUrl) && !unauthenticatedRoutes.includes(request.url)) {
      if (!this.authorizationToken) {
        this.router.navigate(["/auth/login"]);
      }
      this.headers = new HttpHeaders({
        Accept: "application/json",
        Authorization: `Bearer ${this.authorizationToken}`,
      });

      const options = {
        headers: this.headers,
        observe: "response",
        reportProgress: true,
        withCredentials: true,
      };

      const clonedRequest = request.clone(options);

      return next.handle(clonedRequest).pipe(
        catchError((err) => {
          throw err; 
        })
      );
    } else {
      return next.handle(request.clone({ reportProgress: true, withCredentials: true }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
