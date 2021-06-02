import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { MenuComponent } from "./pages/shared/menu/menu.component";

const routes: Routes = [
  {
    path: "auth",
    component: MenuComponent,
    loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "app",
    component: MenuComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import("./pages/client/client.module").then((m) => m.ClientModule),
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
