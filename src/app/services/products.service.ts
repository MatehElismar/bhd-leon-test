import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Api } from "../interfaces";
const { apiUrl } = environment;

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  accessToken: string;
  refreshToken: string;
  constructor(private httpClient: HttpClient) {}

  getAccounts() {
    return this.httpClient.get<Api.IBankAccount[]>(`${apiUrl}/products/accounts`).pipe(
      catchError((err) => {
        console.error(err);
        return of<Api.IBankAccount[]>([
          {
            alias: "Cuenta de ahorros 1",
            number: "1234567890001",
            availableAmount: 100000,
            productType: "AC",
          },

          {
            alias: "Cuenta de ahorros 2",
            number: "1234567890002",
            availableAmount: 200000,
            productType: "AC",
          },
        ]);
      })
    );
  }

  getCreditCards() {
    return this.httpClient.get<Api.ICreditCard[]>(`${apiUrl}/products/credit_cards`).pipe(
      catchError((err) => {
        console.error(err);
        return of<Api.ICreditCard[]>([
          {
            alias: "Tarjeta de crédito 1",
            number: "0987 6543 2109 0001",
            availableAmountRD: 1000000,
            availableAmountUS: 1000,
            isInternational: true,
            productType: "TC",
          },

          {
            alias: "Tarjeta de crédito 2",
            number: "0987 6543 2109 0002",
            availableAmountRD: 2000000,
            availableAmountUS: 0,
            isInternational: false,
            productType: "TC",
          },
        ]);
      })
    );
  }
}
