import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Api, AppState } from "src/app/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { SubSink } from "subsink";

interface IMenuItem {
  type: "item" | "divider";
  text?: string;
  icon?: string;
  routerLink?: string;
}

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  loginItems: IMenuItem[] = [
    { type: "item", text: "Contacto", icon: "icon_contact.svg", routerLink: "/app/contact" },
    { type: "item", text: "Sucursales", icon: "icon_branches.svg", routerLink: "/app/offices" },
  ];

  menuItems: IMenuItem[] = [
    { type: "item", text: "Mis Productos", icon: "icon_my_products_green.svg", routerLink: "/app/tabs/products" },
    { type: "item", text: "Transacciones", icon: "icon_transactions_green.svg", routerLink: "/app/tabs/transactions" },
    { type: "item", text: "Ofertas", icon: "icon_offers_green.svg", routerLink: "/app/tabs/offers" },
    { type: "item", text: "Configuracion", icon: "icon_config_green.svg", routerLink: "/app/tabs/settings" },
  ];

  items: IMenuItem[] = [];
  userProfile: Api.IUserData;
  subs = new SubSink()
  constructor(private store: Store<AppState>, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.subs.sink  = this.store.subscribe((store) => {
      this.loggedIn = !!store.auth.credentials.access_token;

      this.userProfile = store.auth.profile; 
      if (this.loggedIn) {
        this.items = [...this.menuItems, { type: "divider" }, ...this.loginItems];
      } else {
        this.items = this.loginItems;
      }
    });
  }

  signOut() {
    this.auth.signOut().subscribe(() => {
      this.router.navigateByUrl("/auth", { replaceUrl: true });
    });
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }
}
