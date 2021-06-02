import { Component, OnInit } from "@angular/core";
import { Api } from "src/app/interfaces";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit {
  bankAccounts$ = this.products.getAccounts();
  creditCards$ = this.products.getCreditCards();

  constructor(private products: ProductsService) {}

  ngOnInit() {}
}
