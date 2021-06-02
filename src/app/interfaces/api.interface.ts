export namespace Api {
  export interface ICredentials {
    access_token: string;
    refresh_token: string;
  }

  export interface IUserData {
    name: string;
    lastName: string;
    photo: string;
  }

  export interface IBankAccount {
    alias: string;
    number: string;
    availableAmount: number;
    productType: string;
  }

  export interface ICreditCard {
    alias: string;
    number: string;
    availableAmountRD: number;
    availableAmountUS: number;
    isInternational: boolean;
    productType: string;
  }
}
