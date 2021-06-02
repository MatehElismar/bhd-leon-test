import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "products",
        loadChildren: () =>
          import("./products/products.module").then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: "transactions",
        loadChildren: () =>
          import("./transactions/transactions.module").then(
            (m) => m.TransactionsPageModule
          ),
      },
      {
        path: "offers",
        loadChildren: () =>
          import("./offers/offers.module").then((m) => m.OffersPageModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
