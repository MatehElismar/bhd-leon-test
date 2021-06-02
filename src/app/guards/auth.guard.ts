import { Injectable, OnDestroy } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { AppState } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild, OnDestroy {
  logged: boolean;
  subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router) {
    this.subs.sink = this.store.subscribe((x) => (this.logged = !!x.auth.credentials.access_token));
  }
  canActivate(): boolean {
    return this.isLogged();
  }

  canActivateChild(): boolean {
    return this.isLogged();
  }

  private isLogged() {
    if (!this.logged) {
      this.router.navigateByUrl("/auth", { replaceUrl: true });
    }
    return !!this.logged;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
